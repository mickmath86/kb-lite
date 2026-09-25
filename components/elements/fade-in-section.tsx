'use client'

import { useEffect, useRef, type ComponentProps } from 'react'

export function FadeInSection({ 
  children, 
  className = '',
  delay = 0,
  ...props 
}: ComponentProps<'div'> & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-fade-in-up')
              entry.target.classList.remove('opacity-0')
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div ref={ref} className={`opacity-0 ${className}`} {...props}>
      {children}
    </div>
  )
}
