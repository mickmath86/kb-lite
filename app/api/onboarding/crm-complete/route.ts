const LOCATION_ID_RE = /^[a-zA-Z0-9_-]{8,80}$/

export async function POST(request: Request) {
  const form = await request.formData()
  const rawLocationId = form.get('location_id') ?? form.get('location') ?? form.get('locationId')
  const locationId =
    typeof rawLocationId === 'string' && LOCATION_ID_RE.test(rawLocationId) ? rawLocationId : null

  const webhookUrl = process.env.CRM_ONBOARDING_COMPLETE_WEBHOOK_URL
  if (webhookUrl?.startsWith('https://')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'crm_onboarding_guide_completed',
          source: 'kickbord-onboarding-crm-guide',
          location_id: locationId,
          locationId,
          completed_at: new Date().toISOString(),
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      })
    } catch (error) {
      console.error('CRM onboarding completion webhook failed', error)
    }
  }

  const destination = new URL('/onboarding/crm', request.url)
  destination.searchParams.set('completed', '1')
  if (locationId) destination.searchParams.set('location', locationId)
  return Response.redirect(destination, 303)
}
