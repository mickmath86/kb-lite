-- Login created in the onboarding setup step (password is never stored).
alter table public.client_onboardings
  add column if not exists ghl_user_id text,
  add column if not exists login_email text,
  add column if not exists login_created_at timestamptz,
  add column if not exists login_attempts int not null default 0;
