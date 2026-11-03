-- Link onboarding answers to the portal account (public.clients) that filled them in.
-- kickbord.com submissions keep client_id null until a portal client is linked.

alter table public.client_onboardings
  add column if not exists client_id uuid references public.clients(id) on delete set null;

create index if not exists client_onboardings_client_idx on public.client_onboardings (client_id, created_at desc);

-- Backfill: records whose CRM location and email match a portal account.
update public.client_onboardings o
set client_id = c.id
from public.clients c
where o.client_id is null
  and c.location_id is not null
  and o.location_id = c.location_id
  and lower(c.email) in (coalesce(o.link_email, ''), lower(coalesce(o.email, '')));

-- Portal read access. Only the onboarding Edge Function (service role) writes.
-- Signed-in users read through RLS, and never see the resume token or the encrypted EIN.
revoke all on public.client_onboardings from anon, authenticated;
grant select (
  id, client_id, status, current_step, plan, ghl_contact_id, demo_url, demo_feedback,
  first_name, last_name, email, phone, company_name, trade, has_ein, ein_last4, has_website, has_gbp,
  answers, source, services, location_id, link_email,
  progress_step_id, progress_step_number, progress_step_count,
  setup_steps, setup_completed_at, ghl_user_id, login_email, login_created_at,
  webhook_status, webhook_sent_at, created_at, updated_at, completed_at
) on public.client_onboardings to authenticated;

drop policy if exists "Clients read own onboarding" on public.client_onboardings;
create policy "Clients read own onboarding" on public.client_onboardings
  for select to authenticated
  using (client_id in (select id from public.clients where user_id = auth.uid()));

drop policy if exists "Admins read all onboarding" on public.client_onboardings;
create policy "Admins read all onboarding" on public.client_onboardings
  for select to authenticated
  using (public.is_admin());
