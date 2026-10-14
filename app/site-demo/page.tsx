type SP = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)

function getDemoUrl(searchParams: SP): string | null {
  const raw = first(searchParams.url)?.trim()
  if (!raw) return null
  try {
    const url = new URL(raw)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url.toString()
  } catch {
    return null
  }
}

export default async function SiteDemoPage({
  searchParams,
}: {
  searchParams: Promise<SP>
}) {
  const sp = await searchParams
  const demoUrl = getDemoUrl(sp)

  if (!demoUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center p-6 text-center text-white">
        <div className="max-w-md space-y-2">
          <h1 className="text-2xl font-semibold">Demo URL required</h1>
          <p className="text-olive-300">
            Add a <code className="rounded bg-white/10 px-1">?url=</code> query parameter with the site you want to demo.
          </p>
        </div>
      </div>
    )
  }

  return (
    <iframe
      src={demoUrl}
      title="Site demo"
      className="h-full w-full border-0"
      allow="fullscreen"
    />
  )
}
