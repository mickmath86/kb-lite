'use client'

import posthog from 'posthog-js'
import { clsx } from 'clsx/lite'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, ButtonLink, PlainButton } from '@/components/elements/button'
import { ArrowNarrowLeftIcon } from '@/components/icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import {
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import {
  ApiError, completeSubmission, deleteFile, loadSubmission, saveSubmission, uploadFile, type Meta,
} from '@/lib/onboarding/api'
import { STEPS, defaultHours, resolve, validateStep, visibleFields, visibleSteps } from '@/lib/onboarding/schema'
import type { Answers, Ctx, FileRec } from '@/lib/onboarding/types'
import { FieldRenderer, DemoPreview } from './fields'
import { hostnameOf } from './util'

const STORAGE_KEY = 'kickbord_onboarding_token'

export type FlowProps = {
  /** Validated https demo-site URL from the `demo` query parameter. */
  demoUrl: string | null
  prefill: Answers
  meta: Meta
  tokenParam: string | null
}

type Phase = 'loading' | 'welcome' | 'form' | 'done'

export function OnboardingFlow({ demoUrl: demoParam, prefill, meta, tokenParam }: FlowProps) {
  const [phase, setPhase] = useState<Phase>('loading')
  const [token, setToken] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Answers>(prefill)
  const [ein, setEin] = useState('')
  const [files, setFiles] = useState<FileRec[]>([])
  const [einOnFile, setEinOnFile] = useState(false)
  const [einLast4, setEinLast4] = useState<string | null>(null)
  const [demoUrl, setDemoUrl] = useState<string | null>(demoParam)
  const [stepId, setStepId] = useState(STEPS[0].id)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [banner, setBanner] = useState<string | null>(null)
  const [uploading, setUploading] = useState<Record<string, number>>({})
  const [resumeNote, setResumeNote] = useState(false)
  const [hp, setHp] = useState('')

  const ctx: Ctx = useMemo(() => ({ files, demo: !!demoUrl, einOnFile, einLast4 }), [files, demoUrl, einOnFile, einLast4])
  const steps = useMemo(() => visibleSteps(answers, ctx), [answers, ctx])
  const stepIdx = Math.max(0, steps.findIndex((s) => s.id === stepId))
  const step = steps[stepIdx] ?? steps[0]
  const isLast = stepIdx === steps.length - 1

  // ── bootstrap: resume by token, or start fresh ─────────────────────────
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const stored = tokenParam || (typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null)
      if (stored) {
        try {
          const saved = await loadSubmission(stored)
          if (cancelled) return
          const differentClient = !tokenParam && demoParam && saved.demo_url && saved.demo_url !== demoParam
          if (!differentClient) {
            setToken(saved.token)
            setFiles(saved.files)
            setEinOnFile(saved.has_ein_on_file)
            setEinLast4(saved.ein_last4)
            setDemoUrl(saved.demo_url ?? demoParam)
            setAnswers({ ...prefill, ...saved.answers })
            if (saved.status === 'completed') return setPhase('done')
            const savedStep = STEPS[Math.min(saved.step, STEPS.length - 1)]
            setStepId(savedStep.id)
            setPhase(saved.step > 0 ? 'form' : 'welcome')
            return
          }
        } catch (e) {
          if (!(e instanceof ApiError) || e.status !== 404) {
            if (!cancelled) {
              setBanner('We could not load your saved progress. You can keep going, and we will try to save again.')
            }
          }
          window.localStorage.removeItem(STORAGE_KEY)
        }
      }
      if (!cancelled) setPhase('welcome')
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── helpers ───────────────────────────────────────────────────────────
  const set = useCallback((id: string, v: unknown) => {
    setAnswers((prev) => ({ ...prev, [id]: v }))
    setErrors((prev) => (prev[id] ? { ...prev, [id]: '' } : prev))
  }, [])

  function withDefaults(target: (typeof STEPS)[number], a: Answers): Answers {
    const next = { ...a }
    for (const f of visibleFields(target, a, ctx)) {
      const empty = next[f.id] === undefined || next[f.id] === '' || (Array.isArray(next[f.id]) && next[f.id].length === 0)
      if (!empty) continue
      if (f.type === 'hours') next[f.id] = defaultHours()
      else if (f.defaultValue) {
        const d = f.defaultValue(next)
        if (d !== undefined && d !== '') next[f.id] = d
      }
    }
    return next
  }

  async function persist(nextStepId: string, a: Answers = answers): Promise<string | null> {
    const idx = STEPS.findIndex((s) => s.id === nextStepId)
    const payload = {
      step: idx, answers: a, ein: ein.replace(/\D/g, '') || undefined, hp,
    }
    const fresh = { ...meta, demo: demoUrl ?? meta.demo }
    let res
    try {
      res = await saveSubmission({ token, ...payload, meta: token ? undefined : fresh })
    } catch (e) {
      // The saved record no longer exists (for example it was cleared). Start a new one with the current
      // answers instead of blocking the client.
      if (e instanceof ApiError && e.status === 404 && token) {
        window.localStorage.removeItem(STORAGE_KEY)
        const lostFiles = files.length > 0
        const lostEin = einOnFile && !ein
        if (lostFiles) setFiles([])
        if (lostEin) { setEinOnFile(false); setEinLast4(null) }
        if (lostFiles || lostEin) setBanner('Your saved session was reset, so please re-enter your EIN and re-upload any files.')
        res = await saveSubmission({ token: null, ...payload, meta: fresh })
      } else {
        throw e
      }
    }
    if (res.status === 'completed') { setPhase('done'); return null }
    if (ein) { setEinOnFile(true); setEinLast4(ein.replace(/\D/g, '').slice(-4)); setEin('') }
    if (res.token !== token) {
      setToken(res.token)
      window.localStorage.setItem(STORAGE_KEY, res.token)
      const url = new URL(window.location.href)
      url.searchParams.set('t', res.token)
      window.history.replaceState(null, '', url.toString())
    }
    return res.token
  }

  function go(toId: string, a: Answers) {
    const target = STEPS.find((s) => s.id === toId)!
    setAnswers(withDefaults(target, a))
    setStepId(toId)
    setErrors({})
    setBanner(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = Object.keys(errs).find((k) => errs[k])
    if (first) document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function start() {
    const first = visibleSteps(answers, ctx)[0]
    go(first.id, answers)
    setPhase('form')
    posthog.capture('onboarding_started', { has_demo: !!demoUrl })
  }

  async function next() {
    const errs = validateStep(step, answers, ctx, ein)
    if (Object.values(errs).some(Boolean)) { setErrors(errs); focusFirstError(errs); return }
    setBusy(true)
    setBanner(null)
    try {
      if (isLast) return await submit()
      const nextStep = steps[stepIdx + 1]
      const saved = await persist(nextStep.id)
      if (saved === null) return
      posthog.capture('onboarding_step_completed', { step: step.id })
      go(nextStep.id, answers)
    } catch (e) {
      setBanner(e instanceof Error ? e.message : 'Could not save. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function back() {
    if (stepIdx === 0) { setPhase('welcome'); return }
    const prev = steps[stepIdx - 1]
    setBusy(true)
    try { await persist(prev.id) } catch { /* going back never blocks on a failed save */ }
    setBusy(false)
    go(prev.id, answers)
  }

  async function saveForLater() {
    setBusy(true)
    setBanner(null)
    try {
      await persist(step.id)
      setResumeNote(true)
    } catch (e) {
      setBanner(e instanceof Error ? e.message : 'Could not save. Please try again.')
    } finally { setBusy(false) }
  }

  async function submit() {
    // Re-validate every visible step so a hidden earlier gap is caught before sending.
    for (const s of steps) {
      const errs = validateStep(s, answers, ctx, ein)
      if (Object.values(errs).some(Boolean)) {
        go(s.id, answers)
        setErrors(errs)
        setBanner(`Please finish "${resolve(s.title, answers, ctx)}" before submitting.`)
        return
      }
    }
    const pruned: Answers = {}
    for (const s of steps) for (const f of visibleFields(s, answers, ctx)) if (answers[f.id] !== undefined) pruned[f.id] = answers[f.id]
    for (const k of ['first_name', 'last_name', 'email', 'mobile', 'company_name']) pruned[k] = answers[k]
    const t = await persist(step.id, pruned)
    if (!t) return
    try {
      await completeSubmission({
        token: t, step: STEPS.length, answers: pruned,
        // An EIN is only kept when the client said they have one.
        ein: answers.has_ein === 'yes' ? ein.replace(/\D/g, '') || undefined : '',
      })
    } catch (e) {
      const missing = e instanceof ApiError && Array.isArray(e.data?.missing) ? (e.data.missing as string[]) : []
      if (missing.includes('ein')) {
        go('legal', answers)
        setBanner('Please re-enter your EIN to finish.')
        return
      }
      throw e
    }
    posthog.capture('onboarding_completed', { has_demo: !!demoUrl, demo_feedback: answers.demo_feedback ?? null })
    window.localStorage.removeItem(STORAGE_KEY)
    setAnswers(pruned)
    setPhase('done')
    window.scrollTo({ top: 0 })
  }

  async function onUpload(fieldId: string, list: FileList) {
    setBanner(null)
    let t = token
    try {
      if (!t) t = await persist(step.id)
      if (!t) return
      const field = step.fields.find((f) => f.id === fieldId)
      const max = field?.maxFiles ?? 1
      const existing = files.filter((f) => f.field_id === fieldId).length
      const picked = Array.from(list).slice(0, Math.max(0, max - existing))
      setUploading((u) => ({ ...u, [fieldId]: picked.length }))
      for (const file of picked) {
        try {
          const rec = await uploadFile(t, fieldId, file)
          setFiles((prev) => [...prev, rec])
        } catch (e) {
          setBanner(`${file.name}: ${e instanceof Error ? e.message : 'upload failed.'}`)
        } finally {
          setUploading((u) => ({ ...u, [fieldId]: Math.max(0, (u[fieldId] ?? 1) - 1) }))
        }
      }
    } catch (e) {
      setBanner(e instanceof Error ? e.message : 'Upload failed.')
      setUploading((u) => ({ ...u, [fieldId]: 0 }))
    }
  }

  async function onRemoveFile(f: FileRec) {
    if (!token) return
    try {
      await deleteFile(token, f.id)
      setFiles((prev) => prev.filter((x) => x.id !== f.id))
    } catch (e) {
      setBanner(e instanceof Error ? e.message : 'Could not remove the file.')
    }
  }

  const resumeLink = token && typeof window !== 'undefined'
    ? (() => { const u = new URL(window.location.href); u.searchParams.set('t', token); return u.toString() })()
    : ''

  // ── render ────────────────────────────────────────────────────────────
  const shell = (children: React.ReactNode) => (
    <>
      <NavbarWithLogoActionsAndCenteredLinks
        id="navbar"
        links={<></>}
        logo={
          <NavbarLogo href="/">
            <img src="/Logos/icon.svg" alt="Kickbord" width={85} height={28} />
          </NavbarLogo>
        }
        actions={
          <a href="/contact" className="text-sm/7 font-medium text-olive-950 hover:underline dark:text-white">Need help?</a>
        }
      />
      <main className="isolate flex min-h-[calc(100vh-84px)] flex-col">{children}</main>
    </>
  )

  if (phase === 'loading') {
    return shell(<p className="m-auto px-6 py-24 text-sm text-olive-500">Loading your onboarding...</p>)
  }

  if (phase === 'welcome') {
    const name = answers.first_name
    return shell(
      <div className="flex flex-1 items-start justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-2xl">
          <p className="mb-2 font-mono text-xs font-semibold tracking-widest text-olive-500 uppercase">Client onboarding</p>
          <h1 className="font-display text-3xl tracking-tight text-olive-950 sm:text-4xl dark:text-white">
            {name ? `Welcome, ${name}. Let's get you set up.` : "Welcome. Let's get you set up."}
          </h1>
          <p className="mt-3 text-base text-olive-600 dark:text-olive-400">
            This takes about 10 to 15 minutes. Your progress saves automatically, so you can stop and pick up later from the same link.
          </p>
          <div className="mt-8 rounded-xl bg-olive-950/5 p-5 dark:bg-white/5">
            <p className="text-sm font-semibold text-olive-950 dark:text-white">It helps to have on hand</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {[
                'Your EIN (federal tax ID), if you have one',
                'Your logo and a few photos of your work',
                'The email you use for Google, and where your domain was bought',
                'Your business hours and the areas you serve',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-olive-700 dark:text-olive-400"><CheckmarkIcon />{t}</li>
              ))}
            </ul>
          </div>
          {demoUrl && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-olive-950/10 bg-white p-4 dark:border-white/10 dark:bg-olive-900/50">
              <p className="text-sm text-olive-700 dark:text-olive-300">
                We built a demo site for you: <span className="font-semibold text-olive-950 dark:text-white">{hostnameOf(demoUrl)}</span>. We will ask about it in step 4.
              </p>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-olive-950 underline dark:text-white">Open it now</a>
            </div>
          )}
          {banner && <p role="alert" className="mt-6 text-sm text-red-600">{banner}</p>}
          <div className="mt-8">
            <Button size="lg" onClick={start}>{token ? 'Continue' : 'Start'} <ArrowNarrowRightIcon /></Button>
          </div>
          <p className="mt-6 text-xs text-olive-500">We never ask for passwords. Your answers are used only to set up your Kickbord services.</p>
        </div>
      </div>,
    )
  }

  if (phase === 'done') {
    const timeline: [string, string][] = [
      ['Now', 'We review your answers and start your texting registration. Carrier approval can take a few days.'],
      ['Days 2 to 10', 'We build your website, AI receptionist, and review funnel.'],
      ['Days 10 to 14', 'You review everything and request changes.'],
      ['Weeks 2 to 3', 'You go live.'],
    ]
    return shell(
      <div className="flex flex-1 items-start justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-2xl">
          <p className="mb-2 font-mono text-xs font-semibold tracking-widest text-olive-500 uppercase">All set</p>
          <h1 className="font-display text-3xl tracking-tight text-olive-950 sm:text-4xl dark:text-white">
            {answers.first_name ? `Thank you, ${answers.first_name}.` : 'Thank you.'} We have everything we need to start.
          </h1>
          <ol className="mt-8 flex flex-col gap-4">
            {timeline.map(([when, what]) => (
              <li key={when} className="flex gap-4 rounded-xl border border-olive-950/10 bg-white p-4 dark:border-white/10 dark:bg-olive-900/50">
                <span className="w-28 shrink-0 text-sm font-semibold text-olive-950 dark:text-white">{when}</span>
                <span className="text-sm text-olive-700 dark:text-olive-300">{what}</span>
              </li>
            ))}
          </ol>
          {answers.has_gbp === 'yes' && (
            <p className="mt-6 text-sm text-olive-700 dark:text-olive-300">Watch your inbox. We will email the steps to add Kickbord as a manager on your Google Business Profile.</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/lp/booking" size="lg">Book your kickoff call <ArrowNarrowRightIcon /></ButtonLink>
          </div>
        </div>
      </div>,
    )
  }

  // form
  const fields = visibleFields(step, answers, ctx)
  const title = resolve(step.title, answers, ctx)
  const intro = resolve(step.intro, answers, ctx)
  return shell(
    <>
      <div className="border-b border-olive-950/10 dark:border-white/10">
        <div className="mx-auto w-full max-w-3xl px-6 py-5 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                {steps.map((s, i) => (
                  <div key={s.id} className={clsx('h-1.5 rounded-full transition-all duration-300', i < stepIdx ? 'w-5 bg-olive-950 dark:bg-olive-300' : i === stepIdx ? 'w-7 bg-olive-950 dark:bg-olive-300' : 'w-3 bg-olive-950/15 dark:bg-white/15')} />
                ))}
              </div>
              <span className="font-mono text-xs text-olive-500">{stepIdx + 1} / {steps.length}</span>
            </div>
            <span className="flex items-center gap-3 text-xs text-olive-500">
              {demoUrl && <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="underline">View your demo</a>}
              <span>Saves as you go</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-start justify-center px-6 py-10 md:py-14">
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <p className="mb-2 font-mono text-xs font-semibold tracking-widest text-olive-500 uppercase">Step {stepIdx + 1}</p>
            <h1 className="font-display text-2xl tracking-tight text-olive-950 sm:text-3xl dark:text-white">{title}</h1>
            {intro && <p className="mt-2 text-base text-olive-600 dark:text-olive-400">{intro}</p>}
          </div>

          {/* Honeypot: real visitors never see or fill this. */}
          <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} name="company_website" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            {fields.map((f) => (
              <FieldRenderer
                key={f.id} field={f} answers={answers} ctx={ctx} value={answers[f.id]} error={errors[f.id] || undefined}
                onChange={(v) => set(f.id, v)} ein={ein} onEin={(v) => { setEin(v); setErrors((e) => ({ ...e, ein: '' })) }}
                uploading={uploading} onUpload={onUpload} onRemoveFile={onRemoveFile} demoUrl={demoUrl}
              />
            ))}
          </div>

          {banner && <p role="alert" className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{banner}</p>}
          {Object.values(errors).some(Boolean) && !banner && (
            <p role="alert" className="mt-6 text-sm text-red-600 dark:text-red-400">Please fix the highlighted fields to continue.</p>
          )}
          {resumeNote && resumeLink && (
            <div className="mt-6 rounded-xl bg-olive-950/5 p-4 text-sm text-olive-800 dark:bg-white/5 dark:text-olive-200">
              <p className="font-semibold">Progress saved. Use this link to come back any time.</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input readOnly value={resumeLink} onFocus={(e) => e.currentTarget.select()} className="min-w-0 flex-1 rounded-lg border border-olive-950/15 bg-white px-3 py-2 text-xs dark:bg-olive-900" />
                <button type="button" onClick={() => navigator.clipboard?.writeText(resumeLink)} className="rounded-full bg-olive-950 px-4 py-1.5 text-xs font-medium text-white dark:bg-olive-300 dark:text-olive-950">Copy</button>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            <PlainButton size="md" onClick={back} disabled={busy}>
              <ArrowNarrowLeftIcon /> Back
            </PlainButton>
            <div className="flex items-center gap-3">
              <PlainButton size="md" onClick={saveForLater} disabled={busy} className="max-sm:hidden">Save and finish later</PlainButton>
              <Button size="lg" onClick={next} disabled={busy || Object.values(uploading).some((n) => n > 0)} className="disabled:opacity-50">
                {busy ? 'Saving...' : isLast ? 'Submit' : 'Continue'}
                {!busy && <ArrowNarrowRightIcon />}
              </Button>
            </div>
          </div>
          <div className="mt-4 sm:hidden">
            <PlainButton size="md" onClick={saveForLater} disabled={busy}>Save and finish later</PlainButton>
          </div>
        </div>
      </div>
    </>,
  )
}

export { DemoPreview }
