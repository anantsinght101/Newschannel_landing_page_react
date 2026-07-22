# Supabase & Cloudflare R2 Admin Setup Guide - Step 2

Follow these step-by-step instructions to connect your Supabase project, execute database migrations, set up Cloudflare R2 storage, configure Supabase Edge Function secrets, and deploy the `generate-upload-url` function.

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
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

-- Step 4: Enable Row Level Security (RLS)
alter table categories enable row level security;
alter table articles enable row level security;

-- Step 5: Define RLS Policies
-- Public can read categories (required for upload form dropdown & navigation)
create policy "Public read categories"
  on categories for select
  using (true);

-- Public can read only published articles
create policy "Public read published articles"
  on articles for select
  using (status = 'published');

-- Single Admin Model: Any authenticated user can insert articles
-- NOTE: Since there is only ever one admin account, RLS policies treat "any authenticated user" as "the admin" for now.
create policy "Admin can insert articles"
  on articles for insert
  to authenticated
  with check (true);

-- Single Admin Model: Any authenticated user can update articles
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
  ('विशेष', 'special')
on conflict (slug) do update set name = excluded.name;
```

---

## 3. Disable Public Sign-ups & Create Admin User

Because there is **no public user signup** or public user login:

1. Go to **Authentication** -> **Providers** -> **Email** in the Supabase Dashboard.
2. Toggle off **"Allow new users to sign up"** (Disable public signups).
3. Go to **Authentication** -> **Users**.
4. Click **"Add user"** -> **"Create user"**.
5. Enter the Admin Email ID and a strong Password. Click **"Create user"**.
6. Use these credentials to sign in at `/admin/login` in the application.

---

## 4. Cloudflare R2 Bucket Setup (Direct Storage)

Follow these steps in the [Cloudflare Dashboard](https://dash.cloudflare.com/):

1. **Create Bucket**:
   - Go to **R2** -> **Overview** -> **Create bucket**.
   - Bucket Name: `news-media`

2. **Configure CORS Rules**:
   - Navigate to **R2** -> **news-media** -> **Settings** -> **CORS Policy**.
   - Add the following CORS rule to allow direct browser `PUT` and `GET` requests from your frontend origins:
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

3. **Enable Public Access**:
   - Under bucket **Settings** -> **Public Access**, enable **R2.dev Subdomain** (e.g. `https://pub-xxxxxxxx.r2.dev`) or connect your custom domain.
   - Copy this base URL — it will serve as your `R2_PUBLIC_BASE_URL`.

4. **Generate R2 API Credentials**:
   - Go to **R2** -> **Manage R2 API Tokens** -> **Create API Token**.
   - Permissions: **Object Read & Write**, scoped to bucket `news-media`.
   - Copy the generated:
     - Account ID (found on the main R2 Overview page right-hand sidebar)
     - Access Key ID
     - Secret Access Key

---

## 5. Supabase Edge Function Setup (`generate-upload-url`)

The application uses a Supabase Edge Function to generate short-lived (5-minute) S3 presigned `PUT` URLs so browser clients upload files directly to Cloudflare R2 without passing file streams through Supabase.

### Set Edge Function Secrets

Run the following commands using the [Supabase CLI](https://supabase.com/docs/guides/cli) or set them under **Project Settings** -> **Functions** in the Supabase Dashboard:

```bash
supabase secrets set R2_ACCOUNT_ID="your_cloudflare_account_id"
supabase secrets set R2_ACCESS_KEY_ID="your_r2_access_key_id"
supabase secrets set R2_SECRET_ACCESS_KEY="your_r2_secret_access_key"
supabase secrets set R2_BUCKET_NAME="news-media"
supabase secrets set R2_PUBLIC_BASE_URL="https://pub-xxxxxxxx.r2.dev"
```

### Deploy the Edge Function

Deploy the function to your Supabase project:

```bash
supabase functions deploy generate-upload-url
```

---

## 6. Verification Checklist

- [x] **No Credentials Leaked**: Frontend `.env` contains zero R2 keys. R2 keys are stored solely in Edge Function secrets.
- [x] **Authenticated Function**: Edge Function checks the caller's JWT token via `supabase.auth.getUser()`. Returns `401 Unauthorized` if unauthenticated.
- [x] **Direct Upload**: Browser requests `uploadUrl` from Edge Function and `PUT`s file directly to Cloudflare R2.
- [x] **Database Link**: Uploaded files populate `articles.media_urls` as an array of R2 public URLs.
- [x] **Legacy Storage Retired**: Code path no longer writes to `news-media-temp` Supabase Storage bucket.
