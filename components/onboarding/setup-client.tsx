'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { completeSetup, findSubmission, loadSubmission, saveSetup } from '@/lib/onboarding/api'
import { useIsMobileDevice } from '@/lib/onboarding/device'

type Ctx = {
  checked: string[]
  toggle: (id: string) => void
  complete: () => Promise<void>
  busy: boolean
  error: string | null
}

const SetupContext = createContext<Ctx | null>(null)
const useSetup = () => {
  const c = useContext(SetupContext)
  if (!c) throw new Error('SetupProvider missing')
  return c
}

type Props = {
  token: string | null
  location: string | null
  email: string | null
  services: string[]
  children: React.ReactNode
}

/** Saves which setup steps are checked off, and sends the "setup completed" event. */
export function SetupProvider({ token: tokenProp, location, email, services, children }: Props) {
  const [token, setToken] = useState(tokenProp)
  const [checked, setChecked] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Restore saved checkmarks.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        let t = tokenProp
        if (!t && location && email) t = (await findSubmission(location, email)).token
        if (!t) return
        const saved = await loadSubmission(t)
        if (cancelled) return
        setToken(saved.token)
        setChecked(saved.setup_steps ?? [])
      } catch { /* nothing saved yet */ }
    })()
    return () => { cancelled = true }
  }, [tokenProp, location, email])

  const body = useCallback(
    (steps: string[]) => ({ token, location, email, services, steps_checked: steps }),
    [token, location, email, services],
  )

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        saveSetup(body(next)).then((r) => setToken(r.token)).catch(() => {})
      }, 600)
      return next
    })
  }, [body])

  const complete = useCallback(async () => {
    setBusy(true)
    setError(null)
    try {
      if (timer.current) clearTimeout(timer.current)
      await completeSetup(body(checked))
      const u = new URL(window.location.href)
      u.searchParams.set('completed', '1')
      window.location.href = u.toString()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save. Please try again.')
      setBusy(false)
    }
  }, [body, checked])

  return <SetupContext.Provider value={{ checked, toggle, complete, busy, error }}>{children}</SetupContext.Provider>
}

export function StepCheckbox({ id }: { id: string }) {
  const { checked, toggle } = useSetup()
  return (
    <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-xl border border-olive-950/10 bg-white px-4 py-3 text-sm font-semibold text-olive-950 dark:border-white/10 dark:bg-white/5 dark:text-white">
      <input type="checkbox" checked={checked.includes(id)} onChange={() => toggle(id)} className="size-4 shrink-0 accent-olive-950" />
      I&rsquo;ve completed this step
    </label>
  )
}

export function CompleteSetupButton() {
  const { complete, busy, error } = useSetup()
  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <button
        type="button"
        onClick={complete}
        disabled={busy}
        className="w-full rounded-full bg-olive-950 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-olive-800 disabled:opacity-60 dark:bg-white dark:text-olive-950 dark:hover:bg-olive-100"
      >
        {busy ? 'Saving...' : 'I\u2019ve completed setup'}
      </button>
      {error && <p role="alert" className="mt-3 text-center text-sm text-red-600">{error}</p>}
    </div>
  )
}

/** Phones and tablets: explain that setup needs a computer before showing the steps. */
export function DesktopGate({ children }: { children: React.ReactNode }) {
  const mobile = useIsMobileDevice()
  const [dismissed, setDismissed] = useState(false)
  const [copied, setCopied] = useState(false)
  if (!mobile || dismissed) return <>{children}</>
  return (
    <main className="flex min-h-screen items-center justify-center bg-olive-100 px-6 py-16 text-olive-950 dark:bg-olive-950 dark:text-white">
      <div className="w-full max-w-md rounded-3xl border border-olive-950/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-olive-600 dark:text-olive-300">Account setup</p>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-tight">Please switch to a computer</h1>
        <p className="mt-4 text-base leading-7 text-olive-700 dark:text-olive-300">
          This part does not work on phones or tablets. Open the onboarding link from your email on a desktop or laptop and pick up right where you left off.
        </p>
        <p className="mt-3 text-sm text-olive-500 dark:text-olive-400">Do not worry, all your answers are saved.</p>
        <button
          type="button"
          onClick={() => { navigator.clipboard?.writeText(window.location.href); setCopied(true) }}
          className="mt-6 w-full rounded-full bg-olive-950 px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-olive-950"
        >
          {copied ? 'Link copied' : 'Copy this link'}
        </button>
        <button type="button" onClick={() => setDismissed(true)} className="mt-4 text-sm text-olive-500 underline">
          Continue anyway
        </button>
      </div>
    </main>
  )
}
