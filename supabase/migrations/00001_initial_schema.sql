-- BrawlHub Database Schema
-- Run this in your Supabase SQL editor or via CLI migrations

-- ============================================================
-- 1. Profiles (extends Supabase auth.users)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  player_tag text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

-- ============================================================
-- 2. Badge Progress
-- ============================================================
create table public.badge_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id text not null,
  completed boolean default false not null,
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  unique(user_id, badge_id)
);

alter table public.badge_progress enable row level security;

create policy "Users can view their own badge progress"
  on public.badge_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own badge progress"
  on public.badge_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own badge progress"
  on public.badge_progress for update
  using (auth.uid() = user_id);

create policy "Users can delete their own badge progress"
  on public.badge_progress for delete
  using (auth.uid() = user_id);

create index idx_badge_progress_user on public.badge_progress(user_id);

-- ============================================================
-- 3. Saved Builds
-- ============================================================
create table public.saved_builds (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  brawler_id integer not null,
  brawler_name text not null,
  game_mode text,
  star_power text not null,
  gadget text not null,
  gear_1 text not null,
  gear_2 text not null,
  notes text,
  created_at timestamptz default now() not null
);

alter table public.saved_builds enable row level security;

create policy "Users can view their own saved builds"
  on public.saved_builds for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved builds"
  on public.saved_builds for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own saved builds"
  on public.saved_builds for update
  using (auth.uid() = user_id);

create policy "Users can delete their own saved builds"
  on public.saved_builds for delete
  using (auth.uid() = user_id);

create index idx_saved_builds_user on public.saved_builds(user_id);
create index idx_saved_builds_brawler on public.saved_builds(brawler_id);

-- ============================================================
-- 4. Player Bookmarks
-- ============================================================
create table public.player_bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  player_tag text not null,
  player_name text not null,
  trophies integer,
  created_at timestamptz default now() not null,
  unique(user_id, player_tag)
);

alter table public.player_bookmarks enable row level security;

create policy "Users can view their own bookmarks"
  on public.player_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks"
  on public.player_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own bookmarks"
  on public.player_bookmarks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on public.player_bookmarks for delete
  using (auth.uid() = user_id);

create index idx_player_bookmarks_user on public.player_bookmarks(user_id);

-- ============================================================
-- 5. User Preferences
-- ============================================================
create table public.user_preferences (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  favorite_brawler text,
  preferred_mode text,
  show_tips boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.user_preferences enable row level security;

create policy "Users can view their own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);

create trigger user_preferences_updated_at
  before update on public.user_preferences
  for each row execute procedure public.update_updated_at();
