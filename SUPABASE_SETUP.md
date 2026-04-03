# Supabase Setup for GABBAR

To fully migrate the platform to Supabase, you need to create the following tables in your Supabase project.

## 1. Profiles Table
Stores user-specific metadata like rank and anonymous codename.

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  username text unique not null,
  role text default 'Student' check (role in ('Student', 'Professor', 'Admin')),
  campus_id text unique,
  is_banned boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);
```

## 2. Reports Table
Stores intelligence logs.

```sql
create table reports (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  category text not null,
  upvotes int default 0,
  status text default 'Pending',
  user_id uuid references auth.users(id),
  author_email text,
  author_name text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  comments jsonb default '[]'::jsonb
);

-- Set up Row Level Security (RLS)
alter table reports enable row level security;

create policy "Reports are viewable by everyone." on reports
  for select using (true);

create policy "Authenticated users can insert reports." on reports
  for insert with check (auth.uid() = user_id);

create policy "Admins can update all reports." on reports
  for update using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'Admin'
    )
  );

create policy "Users can delete their own reports." on reports
  for delete using (auth.uid() = user_id);

-- 4. Notifications Table
create table notifications (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  user_id uuid references auth.users(id), -- Null for 'Everyone'
  type text default 'system',
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table notifications enable row level security;

create policy "Users can view their own notifications and global ones." on notifications
  for select using (auth.uid() = user_id or user_id is null);

create policy "Admins can manage all notifications." on notifications
  for all using (
    exists (
      select 1 from profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'Admin'
    )
  );
```

## 3. Environment Variables
Add these to your `.env` file:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
