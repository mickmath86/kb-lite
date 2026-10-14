-- Services from the CRM link (?services=...), stored as slugs: launch, grow, website_rebuild,
-- keep_site, reputation, ai_receptionist, lsa, custom. Picks which onboarding sections are shown.
alter table public.client_onboardings add column if not exists services text[] not null default '{}';
