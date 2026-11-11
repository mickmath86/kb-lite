'use client'

import { useEffect } from 'react'

// GoHighLevel's form_embed.js calls history.replaceState with its own URL,
// which drops query params like fbclid/utm_*. Wrap replaceState so any params
// currently in the address bar are re-applied to the rewritten URL.
export function PreserveQueryParams() {
  useEffect(() => {
    const original = history.replaceState
    history.replaceState = function (state, title, url) {
      try {
        if (url != null && window.location.search.length > 1) {
          const next = new URL(url, window.location.href)
          const current = new URLSearchParams(window.location.search)
          for (const [key, value] of current) {
            if (!next.searchParams.has(key)) next.searchParams.set(key, value)
          }
          url = next.origin === window.location.origin ? next.pathname + next.search + next.hash : next.toString()
        }
      } catch {
        // If URL parsing fails, pass the original value through unchanged.
      }
      return original.call(this, state, title, url)
    }
    return () => {
      history.replaceState = original
    }
  }, [])
  return null
}
