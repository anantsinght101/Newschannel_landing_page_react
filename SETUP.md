# Supabase & Admin Setup Guide - Step 1

Follow these step-by-step instructions to connect your Supabase project, execute database migrations, disable public signups, create the single admin user, and configure temporary storage for news media.

---

## 1. Environment Configuration

Create a `.env` file in the project root directory (copied from `.env.example`):

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

> **Note:** Do NOT commit your `.env` file or any service-role key to git. The application uses only the public anon key (`VITE_SUPABASE_ANON_KEY`).

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

## 4. Temporary Supabase Storage Bucket Setup

> **TEMPORARY NOTICE:** Storage bucket `news-media-temp` is used temporarily in Step 1 for media file uploads. This will be replaced by Cloudflare R2 presigned uploads in Step 2.

1. Go to **Storage** in the Supabase Dashboard.
2. Click **"New bucket"**.
3. Bucket Name: `news-media-temp`
4. Enable **"Public bucket"** (so media URLs are publicly accessible) OR configure storage RLS policies for `authenticated` uploads.
5. Click **"Save"**.

---

## 5. Admin Navigation

- Visiting `/admin` while logged out automatically redirects to `/admin/login`.
- A **"Admin Login" / "अ‍ॅडमिन लॉगिन"** link is available in the topbar utility links and mobile navigation sidebar drawer.
- Logging in as the single admin lands on `/admin` where the **"नवीन बातमी अपलोड करा"** button opens the upload form modal.
