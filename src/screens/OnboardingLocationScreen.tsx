import React from 'react'
import { useStore } from '../store/useStore'

const items = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Within 0.5–2 mi',
    desc: 'Only people in walking range',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    label: 'Private by default',
    desc: 'Exact pin never shown to others',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Only while open',
    desc: 'No background location access',
  },
]

export default function OnboardingLocationScreen() {
  const { setScreen, setLocationEnabled } = useStore()

  return (
    <div
      className="screen-enter screen-root flex flex-col h-full bg-bg"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
    >
      {/* Progress */}
      <div style={{ display: 'flex', gap: 6, padding: '16px 24px 0' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, backgroundColor: i === 0 ? '#E8720C' : '#E0DDD9' }} />
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 24px 0' }}>
        {/* Step icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          backgroundColor: '#FEF3EA',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111111', letterSpacing: '-0.6px', lineHeight: 1.2, margin: '0 0 10px' }}>
          Find people near you.
        </h1>
        <p style={{ fontSize: 15, color: '#888888', lineHeight: 1.6, margin: '0 0 32px', maxWidth: 300 }}>
          We show meetups within walking distance. Your exact location is never shared.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(({ icon, label, desc }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #EDEDED',
              padding: '14px 16px',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FEF3EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#111111', margin: '0 0 2px' }}>{label}</p>
                <p style={{ fontSize: 12, color: '#888888', margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          onClick={() => { setLocationEnabled(true); setScreen('onboarding-intents') }}
          style={{ width: '100%', height: 54, borderRadius: 14, background: '#E8720C', color: '#FFFFFF', fontSize: 16, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Enable Location
        </button>
        <button
          onClick={() => setScreen('onboarding-intents')}
          style={{ width: '100%', height: 46, background: 'transparent', border: 'none', color: '#888888', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Not now
        </button>
      </div>
    </div>
  )
}
