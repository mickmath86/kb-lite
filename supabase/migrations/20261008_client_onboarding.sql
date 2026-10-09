-- Kickbord client onboarding: submissions, uploaded files, private storage, Vault secrets.
-- All access goes through the `onboarding` Edge Function (service role). RLS is enabled with
-- no policies, so the anon/authenticated roles cannot read or write these tables directly.

create table if not exists public.client_onboardings (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  current_step int not null default 0,
  plan text,
  ghl_contact_id text,
  demo_url text,
  demo_feedback text,
  first_name text,
  last_name text,
  email text,
  phone text,
  company_name text,
  trade text,
  has_ein boolean,
  ein_encrypted text,
  ein_last4 text,
  has_website boolean,
  has_gbp boolean,
  answers jsonb not null default '{}'::jsonb,
  source text default 'kickbord.com/onboarding',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  webhook_status text not null default 'not_sent'
    check (webhook_status in ('not_sent', 'sent', 'failed', 'pending_config')),
  webhook_attempts int not null default 0,
  webhook_last_error text,
  webhook_sent_at timestamptz
);

create index if not exists client_onboardings_email_idx on public.client_onboardings (lower(email));
create index if not exists client_onboardings_status_idx on public.client_onboardings (status, webhook_status);

create table if not exists public.client_onboarding_files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.client_onboardings(id) on delete cascade,
  field_id text not null,
  storage_path text not null,
  original_name text not null,
  content_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index if not exists client_onboarding_files_submission_idx on public.client_onboarding_files (submission_id);

alter table public.client_onboardings enable row level security;
alter table public.client_onboarding_files enable row level security;

create or replace function public.client_onboardings_touch()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists client_onboardings_touch on public.client_onboardings;
create trigger client_onboardings_touch before update on public.client_onboardings
  for each row execute function public.client_onboardings_touch();

comment on table public.client_onboardings is
  'Kickbord client onboarding questionnaire submissions. Written only by the onboarding Edge Function (service role). EIN is stored AES-GCM encrypted with a key held in Vault.';

-- Private bucket for logos, photos, EIN letters, price lists, customer CSVs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'onboarding-uploads', 'onboarding-uploads', false, 15728640,
  array['image/png','image/jpeg','image/webp','image/svg+xml','image/heic','application/pdf',
        'text/csv','application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
on conflict (id) do nothing;

-- Vault-backed secrets, readable only by the service role through this helper.
create or replace function public.onboarding_secret(p_name text)
returns text language sql security definer set search_path = '' as $$
  select decrypted_secret from vault.decrypted_secrets where name = p_name limit 1
$$;
revoke all on function public.onboarding_secret(text) from public, anon, authenticated;
grant execute on function public.onboarding_secret(text) to service_role;

select vault.create_secret(encode(extensions.gen_random_bytes(32), 'base64'), 'onboarding_ein_key', 'AES-256-GCM key for EIN at rest')
where not exists (select 1 from vault.secrets where name = 'onboarding_ein_key');

select vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'), 'onboarding_webhook_secret', 'HMAC secret for onboarding webhook signature')
where not exists (select 1 from vault.secrets where name = 'onboarding_webhook_secret');

select vault.create_secret(encode(extensions.gen_random_bytes(32), 'hex'), 'onboarding_admin_token', 'Admin token for resend / reveal_ein actions')
where not exists (select 1 from vault.secrets where name = 'onboarding_admin_token');

select vault.create_secret('unset', 'onboarding_webhook_url', 'Destination for the onboarding.completed webhook. Value unset disables sending.')
where not exists (select 1 from vault.secrets where name = 'onboarding_webhook_url');
