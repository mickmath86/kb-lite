-- Swipe-style pricing calibration for Kickbord estimators (kickbord.com/estimator-calibrate).
-- The client reacts to sample jobs (too low / about right / too high). Every swipe is kept in
-- estimator_calibration_responses; the running guesses live in estimator_calibrations.state.
-- Nothing touches estimator_price_rows until the client confirms the summary.

create table if not exists public.estimator_calibrations (
  client_id uuid primary key references public.estimator_clients(id) on delete cascade,
  run int not null default 1,                       -- bumps on "start over"; old swipes keep their run
  status text not null default 'in_progress' check (status in ('in_progress','confirmed')),
  state jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create table if not exists public.estimator_calibration_responses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  run int not null,
  step int not null,
  card_key text not null,
  card_kind text not null,
  scenario jsonb not null default '{}'::jsonb,      -- what the card described
  shown jsonb not null default '{}'::jsonb,         -- price / range shown
  answer text not null,                             -- low | right | high | narrow | wide | typed | choice | multi | skip
  magnitude text,                                   -- little | lot
  typed_value numeric,
  payload jsonb not null default '{}'::jsonb,       -- choices, names, typed ranges
  state_before jsonb not null,                      -- lets the client undo the last swipe
  undone boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists estimator_calibration_responses_client_idx
  on public.estimator_calibration_responses (client_id, run, step);

alter table public.estimator_calibrations enable row level security;
alter table public.estimator_calibration_responses enable row level security;
