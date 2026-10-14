import type { Metadata } from 'next'
import { VideoWidget } from '@/components/site-demo/video-widget'

export const metadata: Metadata = {
  title: 'Site Demo | Kickbord',
  description: 'Explore a live Kickbord site demo.',
}

export default function SiteDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-olive-950">
      {children}
      <VideoWidget />
    </div>
  )
}
