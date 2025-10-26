-- Create savings_goals table
create table if not exists public.savings_goals (
  id uuid primary key default gen_random_uuid(),
  user_address text not null,
  name text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  deadline bigint not null,
  created_at bigint not null,
  completed boolean default false,
  created_at_timestamp timestamptz default now()
);

-- Create index for faster queries
create index if not exists idx_savings_goals_user_address on public.savings_goals(user_address);
create index if not exists idx_savings_goals_completed on public.savings_goals(completed);

-- Enable RLS
alter table public.savings_goals enable row level security;

-- RLS Policies - Allow users to manage their own goals based on wallet address
create policy "Users can view their own goals"
  on public.savings_goals for select
  using (user_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

create policy "Users can insert their own goals"
  on public.savings_goals for insert
  with check (user_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

create policy "Users can update their own goals"
  on public.savings_goals for update
  using (user_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

create policy "Users can delete their own goals"
  on public.savings_goals for delete
  using (user_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- For Web3 apps without Supabase auth, we'll use a simpler policy
-- that allows anyone to read/write (you can add more security later)
drop policy if exists "Users can view their own goals" on public.savings_goals;
drop policy if exists "Users can insert their own goals" on public.savings_goals;
drop policy if exists "Users can update their own goals" on public.savings_goals;
drop policy if exists "Users can delete their own goals" on public.savings_goals;

-- Simple policies for Web3 wallet-based access
create policy "Enable read access for all users" on public.savings_goals for select using (true);
create policy "Enable insert access for all users" on public.savings_goals for insert with check (true);
create policy "Enable update access for all users" on public.savings_goals for update using (true);
create policy "Enable delete access for all users" on public.savings_goals for delete using (true);
