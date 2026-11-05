export function requestOriginAllowed(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return true

  let originHost: string
  try {
    originHost = new URL(origin).host.toLowerCase()
  } catch {
    return false
  }

  const trusted = new Set<string>()
  const hostHeader = request.headers.get('host')?.split(',')[0]?.trim().toLowerCase()
  if (hostHeader) trusted.add(hostHeader)
  try {
    trusted.add(new URL(request.url).host.toLowerCase())
  } catch {
    // Ignore a malformed request URL and rely on the host header.
  }

  // Compare the browser Origin to the host it actually called. Next's request URL
  // can say localhost while the browser is on 127.0.0.1. A forwarded-host header
  // is not enough on its own, because the caller can set it.
  return trusted.has(originHost)
}

export function clientAddress(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const candidate = (forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '').trim()
  if (/^[A-Za-z0-9:.]+$/.test(candidate) && candidate.length <= 64) return candidate
  return 'unknown'
}
