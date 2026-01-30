-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create alerts table
create table public.alerts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  symbol text not null,
  exchange text not null,
  alert_type text not null check (alert_type in ('price', 'technical')),
  condition text not null,
  target_price numeric,
  indicator_settings jsonb,
  is_active boolean default true,
  last_triggered_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for alerts
alter table public.alerts enable row level security;

-- Policies for alerts
create policy "Users can view own alerts."
  on alerts for select
  using ( auth.uid() = user_id );

create policy "Users can insert own alerts."
  on alerts for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own alerts."
  on alerts for update
  using ( auth.uid() = user_id );

create policy "Users can delete own alerts."
  on alerts for delete
  using ( auth.uid() = user_id );

-- Create notification_history table
create table public.notification_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  alert_id uuid references public.alerts(id),
  message text not null,
  channel text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for notification_history
alter table public.notification_history enable row level security;

create policy "Users can view own notification history."
  on notification_history for select
  using ( auth.uid() = user_id );

-- Create user_settings table
create table public.user_settings (
  user_id uuid references public.profiles(id) primary key,
  email_notifications boolean default true,
  push_notifications boolean default false,
  telegram_id text,
  theme text default 'dark',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for user_settings
alter table public.user_settings enable row level security;

create policy "Users can view own settings."
  on user_settings for select
  using ( auth.uid() = user_id );

create policy "Users can update own settings."
  on user_settings for update
  using ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.user_settings (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
