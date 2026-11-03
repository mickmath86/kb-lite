-- Kickbord estimators: one config per client. Prices live in rows; the estimator widget asks
-- estimator_quote() for the total. Nothing is priced unless the client approved the row.

create table if not exists public.estimator_clients (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  public_key text not null unique default encode(gen_random_bytes(16), 'hex'),
  setup_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  settings jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','submitted','approved')),
  pricing_version int not null default 0,
  contact_email text,
  submitted_at timestamptz,
  approved_at timestamptz,
  approved_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Questions the customer sees in the widget (different per client).
create table if not exists public.estimator_questions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  key text not null,
  position int not null,
  eyebrow text, title text not null, subtitle text,
  show_when jsonb not null default '{}'::jsonb,   -- {"projectType":["replacement"]}; empty = always
  unique (client_id, key)
);
create table if not exists public.estimator_options (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  question_key text not null,
  value text not null, label text not null, description text,
  position int not null default 0,
  show_when jsonb not null default '{}'::jsonb,   -- e.g. only show options for a project type
  label_by jsonb not null default '{}'::jsonb,    -- {"brand":{"american-standard":"Silver"}}
  enabled boolean not null default true,
  unique (client_id, question_key, value, show_when)
);

-- One price per combination of answers. when_answers must be a subset of the customer's answers.
create table if not exists public.estimator_price_rows (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  section text not null,                 -- groups rows in the client questionnaire
  group_label text, row_label text,      -- what the client sees
  when_answers jsonb not null,
  low numeric, high numeric,
  quote_mode text not null default 'range' check (quote_mode in ('range','starting_at','site_visit')),
  approved boolean not null default false,
  notes text,
  updated_at timestamptz not null default now(),
  unique (client_id, when_answers)
);
create index if not exists estimator_price_rows_client_idx on public.estimator_price_rows (client_id, section);

create table if not exists public.estimator_addons (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  key text not null, label text not null,
  applies_when jsonb not null default '{}'::jsonb,
  included boolean not null default false,
  price_type text not null default 'flat' check (price_type in ('flat','per_unit','percent','site_visit')),
  unit_answer text,                      -- answer key holding the unit count, for per_unit
  low numeric, high numeric,
  show_line boolean not null default true,
  approved boolean not null default false,
  notes text, position int not null default 0,
  unique (client_id, key)
);

create table if not exists public.estimator_quotes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  answers jsonb not null, result jsonb not null,
  pricing_version int, created_at timestamptz not null default now()
);

create table if not exists public.estimator_test_scenarios (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.estimator_clients(id) on delete cascade,
  position int not null default 0, label text,
  answers jsonb not null,
  client_low numeric, client_high numeric, client_note text
);

alter table public.estimator_clients enable row level security;
alter table public.estimator_questions enable row level security;
alter table public.estimator_options enable row level security;
alter table public.estimator_price_rows enable row level security;
alter table public.estimator_addons enable row level security;
alter table public.estimator_quotes enable row level security;
alter table public.estimator_test_scenarios enable row level security;

create or replace function public.jsonb_key_count(j jsonb) returns int
language sql immutable as $$ select count(*)::int from jsonb_object_keys(j) $$;

-- Quote engine. Public (anon) may call it with a client's public key; it only returns computed output.
create or replace function public.estimator_quote(p_public_key text, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  c public.estimator_clients%rowtype;
  s jsonb; a jsonb := coalesce(p_answers, '{}'::jsonb);
  eff jsonb; rnd numeric; msg text;
  base public.estimator_price_rows%rowtype; n_top int; top_n int;
  lo numeric := 0; hi numeric := 0; lines jsonb := '[]'::jsonb; notes jsonb := '[]'::jsonb;
  ad public.estimator_addons%rowtype; k text; v jsonb; ok boolean; units numeric;
  alo numeric; ahi numeric; result jsonb;
  proj text := a->>'projectType';
begin
  select * into c from public.estimator_clients where public_key = p_public_key;
  if not found or c.status <> 'approved' then
    return jsonb_build_object('status','unavailable','message','This estimator is not available yet.');
  end if;
  s := c.settings; rnd := coalesce((s->>'rounding')::numeric, 100);
  eff := a;
  if a->>'brand' = 'no-preference' and s->>'default_brand' is not null then
    eff := jsonb_set(eff, '{brand}', to_jsonb(s->>'default_brand'));
  end if;

  if a->>'propertyType' = 'commercial' then
    return jsonb_build_object('status','site_visit','message', coalesce(s->>'commercial_message',''),'disclaimer', s->>'disclaimer','pricing_version', c.pricing_version);
  end if;
  if proj = 'repair' then
    return jsonb_build_object('status','repair','message', coalesce(s->>'repair_message',''),'disclaimer', s->>'disclaimer','pricing_version', c.pricing_version);
  end if;
  if a->>'miniSplitRooms' = '5-plus' then
    return jsonb_build_object('status','site_visit','message', coalesce(s->>'site_visit_message', s->>'commercial_message',''),'disclaimer', s->>'disclaimer','pricing_version', c.pricing_version);
  end if;

  -- most specific approved row whose answers are all contained in the customer's answers
  select max(jsonb_key_count(when_answers)) into top_n
  from public.estimator_price_rows r
  where r.client_id = c.id and r.approved and r.low is not null and r.high is not null
    and r.when_answers <@ eff;
  if top_n is null then
    return jsonb_build_object('status','no_price','message', coalesce(s->>'no_price_message',''),'disclaimer', s->>'disclaimer','pricing_version', c.pricing_version);
  end if;
  select count(*) into n_top from public.estimator_price_rows r
  where r.client_id = c.id and r.approved and r.low is not null and r.high is not null
    and r.when_answers <@ eff and jsonb_key_count(r.when_answers) = top_n;
  if n_top <> 1 then
    return jsonb_build_object('status','no_price','message', coalesce(s->>'no_price_message',''),'disclaimer', s->>'disclaimer','pricing_version', c.pricing_version);
  end if;
  select * into base from public.estimator_price_rows r
  where r.client_id = c.id and r.approved and r.low is not null and r.high is not null
    and r.when_answers <@ eff and jsonb_key_count(r.when_answers) = top_n;
  if base.quote_mode = 'site_visit' then
    return jsonb_build_object('status','site_visit','message', coalesce(s->>'site_visit_message',''),'disclaimer', s->>'disclaimer','pricing_version', c.pricing_version);
  end if;
  lo := base.low; hi := base.high;
  lines := lines || jsonb_build_object('label', coalesce(base.row_label,'Base price'), 'low', base.low, 'high', base.high);

  for ad in select * from public.estimator_addons where client_id = c.id order by position, key loop
    ok := true;
    for k, v in select * from jsonb_each(ad.applies_when) loop
      if jsonb_typeof(v) = 'array' then
        if not (v ? coalesce(eff->>k,'')) then ok := false; end if;
      elsif coalesce(eff->>k,'') <> trim(both '"' from v::text) then ok := false; end if;
    end loop;
    continue when not ok or ad.included;
    if not ad.approved then
      notes := notes || to_jsonb(ad.label || ': confirmed on site');
      continue;
    end if;
    if ad.price_type = 'site_visit' or ad.low is null or ad.high is null then
      notes := notes || to_jsonb(ad.label || ': confirmed on site');
      continue;
    end if;
    units := case when ad.price_type = 'per_unit' then coalesce((eff->>ad.unit_answer)::numeric, 1) else 1 end;
    if ad.price_type = 'percent' then alo := lo * ad.low / 100; ahi := hi * ad.high / 100;
    else alo := ad.low * units; ahi := ad.high * units; end if;
    lo := lo + alo; hi := hi + ahi;
    if ad.show_line then lines := lines || jsonb_build_object('label', ad.label, 'low', alo, 'high', ahi); end if;
  end loop;

  lo := round(lo / rnd) * rnd; hi := round(hi / rnd) * rnd;
  result := jsonb_build_object('status','price','low',lo,'high',hi,
    'mode', base.quote_mode, 'lines', lines, 'notes', notes,
    'disclaimer', s->>'disclaimer', 'financing', s->>'financing_message',
    'valid_days', coalesce((s->>'valid_days')::int, 30), 'pricing_version', c.pricing_version);
  insert into public.estimator_quotes (client_id, answers, result, pricing_version) values (c.id, a, result, c.pricing_version);
  return result;
end $$;

revoke all on function public.estimator_quote(text, jsonb) from public;
grant execute on function public.estimator_quote(text, jsonb) to anon, authenticated;
