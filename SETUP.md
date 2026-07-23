# Supabase & Cloudflare R2 Admin Setup Guide - Step 3

Follow these step-by-step instructions to connect your Supabase project, execute database migrations, set up Cloudflare R2 storage, configure Supabase Edge Function secrets, deploy the `generate-upload-url` function, and enable the free-tier safety ceiling.

---

## 1. Environment Configuration

Create a `.env` file in the project root directory (copied from `.env.example`):

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

> **Note:** Do NOT commit your `.env` file or any service-role key to git. The frontend application uses only the public anon key (`VITE_SUPABASE_ANON_KEY`). Cloudflare R2 credentials are strictly stored inside Supabase Edge Function environment secrets.

---

## 2. Database Schema & RLS Migration

In your [Supabase Dashboard](https://database.new/), navigate to **SQL Editor** -> **New Query**, paste the following SQL script, and click **Run**:

```sql
-- Step 1: Enable pgcrypto extension for UUID generation
create extension if not exists "pgcrypto";

-- Step 2: Create Categories Table
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

-- Step 3: Create Articles Table
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  category_id uuid references categories(id) not null,
  content text not null,
  media_urls text[] not null default '{}',
  youtube_url text,
  author text default 'न्यूज यात्रा डिजिटल टीम',
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

-- Step 4: Storage Usage Cache Table (Step 3 R2 Free-Tier Safety Ceiling)
create table if not exists storage_usage_cache (
  id int primary key default 1,
  total_bytes bigint not null default 0,
  checked_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into storage_usage_cache (id, total_bytes, checked_at)
values (1, 0, now())
on conflict (id) do nothing;

-- Step 5: Enable Row Level Security (RLS)
alter table categories enable row level security;
alter table articles enable row level security;
alter table storage_usage_cache enable row level security;

-- Public can read categories
create policy "Public read categories"
  on categories for select
  using (true);

-- Public can read published articles
create policy "Public read published articles"
  on articles for select
  using (status = 'published');

-- Single Admin Model: Any authenticated user can insert/update articles
create policy "Admin can insert articles"
  on articles for insert
  to authenticated
  with check (true);

create policy "Admin can update articles"
  on articles for update
  to authenticated
  using (true);

-- Step 6: Seed Categories Table
insert into categories (name, slug)
values
  ('ताज्या बातम्या', 'latest'),
  ('महाराष्ट्र', 'maharashtra'),
  ('राजकारण', 'politics'),
  ('क्रीडा', 'sports'),
  ('मनोरंजन', 'entertainment'),
  ('व्यवसाय', 'business'),
  ('तंत्रज्ञान', 'tech'),
  ('कृषी', 'agriculture'),
  ('संवाद', 'interviews'),
  ('व्हिडिओ', 'videos'),
  ('विशेष', 'special'),
  ('ग्लोबल', 'global')
on conflict (slug) do update set name = excluded.name;
```

---

## 3. Disable Public Sign-ups & Create Admin User

1. Go to **Authentication** -> **Providers** -> **Email** in the Supabase Dashboard.
2. Toggle off **"Allow new users to sign up"**.
3. Go to **Authentication** -> **Users**.
4. Click **"Add user"** -> **"Create user"**.
5. Enter the Admin Email ID and a strong Password. Click **"Create user"**.

---

## 4. Cloudflare R2 Bucket Setup

1. **Create Bucket**: Name: `news-media`.
2. **CORS Rules**: Under bucket **Settings** -> **CORS Policy**:
   ```json
   [
     {
       "AllowedOrigins": [
         "http://localhost:5173",
         "http://localhost:4173",
         "https://your-production-domain.com"
       ],
       "AllowedMethods": ["PUT", "GET"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```
3. **Public Subdomain**: Enable **R2.dev Subdomain** or connect your custom domain.
4. **API Token**: Create token with **Object Read & Write** permissions for bucket `news-media`.

---

## 5. Supabase Edge Function Setup (`generate-upload-url`)

### Set Edge Function Secrets

Run the following commands using the Supabase CLI or under **Project Settings** -> **Functions**:

```bash
supabase secrets set R2_ACCOUNT_ID="your_cloudflare_account_id"
supabase secrets set R2_ACCESS_KEY_ID="your_r2_access_key_id"
supabase secrets set R2_SECRET_ACCESS_KEY="your_r2_secret_access_key"
supabase secrets set R2_BUCKET_NAME="news-media"
supabase secrets set R2_PUBLIC_BASE_URL="https://pub-xxxxxxxx.r2.dev"

# Step 3: R2 Storage Safety Ceiling Secret (Default: 8GB = 8589934592 bytes)
supabase secrets set R2_STORAGE_CEILING_BYTES="8589934592"
```

### Deploy the Edge Function

```bash
supabase functions deploy generate-upload-url
```

---

## 6. R2 Free-Tier Safety Ceiling & Usage Alerts (Step 3)

### 6.1 Self-Enforced Ceiling (In-Code Enforcement)

- The `generate-upload-url` Edge Function checks `storage_usage_cache`.
- Every 15 minutes, it uses S3 `ListObjectsV2Command` (paginating through all pages) to sum the exact byte usage of the bucket and updates `storage_usage_cache`.
- If `cachedTotalBytes + incomingFileSize > R2_STORAGE_CEILING_BYTES` (default 8GB, leaving 2GB headroom under 10GB free limit), the function returns a `403` HTTP response with `{ "error": "storage_limit_reached" }`.
- The upload modal in the admin panel detects `storage_limit_reached`, halts the entire submission loop, and displays a friendly alert message to the site administrator.

### 6.2 Tuning the Ceiling

To raise or lower the ceiling (e.g. if upgrading to a paid tier), update the secret without changing code:

```bash
npx supabase secrets set R2_STORAGE_CEILING_BYTES="16106127360" --project-ref <your-project-ref>
```

### 6.3 Early Warning Usage Alerts (Cloudflare Dashboard Setup)

> **Note:** This is an early-warning layer only. The Edge Function in-code check is what actively prevents overage; this notification ensures human administrators receive advance warning.

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Notifications** (under account settings).
3. Click **Add** / **Create Notification**.
4. Select the notification category for **R2 Storage Usage** or **Billing Alerts**.
5. Set the threshold to 70%–80% of 10GB (e.g., 7GB or 8GB).
6. Add the administrator email address to receive early warning alerts.

---

## 7. Verification Checklist

- [x] **`npm run build` succeeds** with zero errors.
- [x] **No Credentials Leaked**: Frontend `.env` contains zero R2 keys. R2 keys are stored solely in Edge Function secrets.
- [x] **Ceiling Enforcement**: If storage projected total exceeds `R2_STORAGE_CEILING_BYTES`, function rejects presigned URL request with `storage_limit_reached` (403).
- [x] **Frontend Abort**: Upload modal halts submission loop on `storage_limit_reached` and alerts admin.
- [x] **Paginated Recalculation**: Cache refreshes every 15 minutes via `ListObjectsV2Command`.
- [x] **Documented Setup**: `SETUP.md` contains full instructions for Edge Function secrets and Cloudflare dashboard notification alerts.
