import { ImageResponse } from 'next/og'

export const alt = 'Grow your business with Kickbord'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0b1114 0%, #1d3038 55%, #637c86 100%)',
          color: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              border: '4px solid #ffffff',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-1px' }}>Kickbord</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 980 }}>
          <div
            style={{
              color: '#cfe4ec',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '4px',
              marginBottom: 22,
              textTransform: 'uppercase',
            }}
          >
            Platform tour + free consultation
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-3px' }}>
            Modern marketing that grows your business.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#dbe6ea', fontSize: 26 }}>
            AI voice agents, campaigns, and strategy — $297/mo
          </div>
          <div
            style={{
              background: '#ffffff',
              color: '#17272e',
              borderRadius: 999,
              display: 'flex',
              padding: '16px 26px',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Book a call
          </div>
        </div>
      </div>
    ),
    size,
  )
}
