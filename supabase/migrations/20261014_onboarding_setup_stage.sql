-- Resume by sub-account (location) on any device, progress tracking, and the setup stage.
alter table public.client_onboardings
  add column if not exists location_id text,
  add column if not exists link_email text,
  add column if not exists progress_step_id text,
  add column if not exists progress_step_number int not null default 0,
  add column if not exists progress_step_count int,
  add column if not exists setup_steps text[] not null default '{}',
  add column if not exists setup_completed_at timestamptz,
  add column if not exists setup_webhook_status text;
create index if not exists client_onboardings_location_idx on public.client_onboardings (location_id);
