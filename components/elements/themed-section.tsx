import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

export function ThemedSection({
  theme = 'light',
  children,
  className,
  ...props
}: {
  theme?: 'light' | 'dark'
  children: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        theme === 'dark' && 'dark',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
