// Public estimator API (Supabase Edge Function). Called by a client's website widget.
//
// Each widget is configured with that client's public key. The key picks the client: it decides which
// questions load and which price table is used. It cannot read or change prices; it only gets the
// questions and a computed estimate.
//
//   config  { public_key }           -> questions, options, and the few settings the widget needs.
//   quote   { public_key, answers }  -> estimator_quote() result (price, site_visit, repair, no_price, unavailable).
import { createClient } from 'npm:@supabase/supabase-js@2'

const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, authorization, apikey',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS } })

const KEY_RE = /^[a-f0-9]{32}$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS })
  if (req.method !== 'POST') return json({ error: 'Method not allowed.' }, 405)
  try {
    const raw = await req.text()
    if (raw.length > 20_000) return json({ error: 'Request too large.' }, 413)
    const body = JSON.parse(raw || '{}')
    const key = body.public_key
    if (typeof key !== 'string' || !KEY_RE.test(key)) return json({ error: 'Unknown estimator.' }, 404)

    if (body.action === 'config') {
      const { data: c } = await sb.from('estimator_clients').select('id,name,status,settings').eq('public_key', key).maybeSingle()
      if (!c) return json({ error: 'Unknown estimator.' }, 404)
      const [qs, os] = await Promise.all([
        sb.from('estimator_questions').select('key,position,eyebrow,title,subtitle,show_when').eq('client_id', c.id).order('position'),
        sb.from('estimator_options').select('question_key,value,label,description,position,show_when,label_by').eq('client_id', c.id).eq('enabled', true).order('position'),
      ])
      return json({
        client: { name: c.name, live: c.status === 'approved' },
        settings: { default_brand: c.settings?.default_brand ?? null },
        questions: (qs.data ?? []).map((q) => ({ ...q, options: (os.data ?? []).filter((o) => o.question_key === q.key) })),
      })
    }

    if (body.action === 'quote') {
      const answers: Record<string, string> = {}
      if (body.answers && typeof body.answers === 'object') {
        for (const [k, v] of Object.entries(body.answers).slice(0, 40)) {
          if (typeof v === 'string' && /^[A-Za-z0-9_]{1,40}$/.test(k)) answers[k] = v.slice(0, 80)
        }
      }
      const { data, error } = await sb.rpc('estimator_quote', { p_public_key: key, p_answers: answers })
      if (error) throw error
      return json(data)
    }
    return json({ error: 'Unknown action.' }, 400)
  } catch (err) {
    console.error('estimator-public failed', err)
    return json({ error: 'Something went wrong.' }, 500)
  }
})
