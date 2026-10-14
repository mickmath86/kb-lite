import { parseServices } from '@/lib/onboarding/services'

// Old form endpoint for the setup guide. Forwards to the onboarding service so the webhook uses the
// same payload as every other onboarding event (onboarding.setup_completed).
const LOCATION_ID_RE = /^[a-zA-Z0-9_-]{8,80}$/
const FUNCTION_URL = 'https://rtlhldhumcmzgbvkqmnm.supabase.co/functions/v1/onboarding'

export async function POST(request: Request) {
  const form = await request.formData()
  const rawLocationId = form.get('location_id') ?? form.get('location') ?? form.get('locationId')
  const locationId = typeof rawLocationId === 'string' && LOCATION_ID_RE.test(rawLocationId) ? rawLocationId : null
  const rawServices = form.get('services')
  const services = parseServices(typeof rawServices === 'string' ? rawServices : '')

  if (locationId) {
    try {
      await fetch(process.env.ONBOARDING_FUNCTION_URL?.startsWith('https://') ? process.env.ONBOARDING_FUNCTION_URL : FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup_complete', location: locationId, services, steps_checked: [] }),
        cache: 'no-store',
        signal: AbortSignal.timeout(15_000),
      })
    } catch (error) {
      console.error('setup completion failed', error)
    }
  }

  const destination = new URL('/onboarding/setup', request.url)
  destination.searchParams.set('completed', '1')
  if (locationId) destination.searchParams.set('location', locationId)
  if (services.length) destination.searchParams.set('services', services.join(','))
  return Response.redirect(destination, 303)
}
