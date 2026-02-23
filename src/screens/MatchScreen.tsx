import React from 'react'
import { useStore } from '../store/useStore'

export default function MatchScreen() {
  const { pendingMatch, startSession, setPendingMatch, setScreen } = useStore()

  if (!pendingMatch) { setScreen('home'); return null }

  function handleStart() { startSession(pendingMatch!); setScreen('chat') }
  function handleCancel() { setPendingMatch(null); setScreen('home') }

  const rows = [
    { label: 'Looking for', value: pendingMatch.intents.join(', ') },
    { label: 'Distance', value: `${pendingMatch.distanceMiles} mi away` },
    { label: 'Session', value: '45 min' },
    ...(pendingMatch.badges.length > 0 ? [{ label: 'Verified', value: pendingMatch.badges.map(b => b.label).join(', ') }] : []),
  ]

  return (
    <div
      className="screen-slide-in screen-root flex flex-col h-full"
      style={{ backgroundColor: '#F6F5F3', paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
    >
      {/* Nav bar */}
      <div style={{ padding: '6px 16px 0' }}>
        <button
          onClick={handleCancel}
          style={{ height: 44, display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#888888', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', padding: '0 4px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 20px 0' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              backgroundColor: pendingMatch.avatarColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}>
              <span style={{ color: 'white', fontSize: 28, fontWeight: 700, letterSpacing: '-1px' }}>
                {pendingMatch.initials}
              </span>
            </div>
            {pendingMatch.availableNow && (
              <div style={{ position: 'absolute', bottom: 3, right: 3, width: 16, height: 16, borderRadius: '50%', backgroundColor: '#22C55E', border: '2.5px solid #F6F5F3' }} />
            )}
          </div>
        </div>

        {/* Name + headline */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111111', letterSpacing: '-0.5px', margin: '0 0 6px' }}>
            Meet {pendingMatch.firstName}
          </h1>
          {/* Star rating */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.floor(pendingMatch.ratingAvg) ? '#E8720C' : '#DDDDDD'}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111111', marginLeft: 2 }}>{pendingMatch.ratingAvg.toFixed(1)}</span>
          </div>
        </div>

        {/* Detail card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, border: '1px solid #EDEDED', overflow: 'hidden', marginBottom: 16 }}>
          {rows.map((row, idx) => (
            <div
              key={row.label}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 16px',
                borderBottom: idx < rows.length - 1 ? '1px solid #F0F0F0' : 'none',
              }}
            >
              <span style={{ fontSize: 13, color: '#888888', fontWeight: 500 }}>{row.label}</span>
              <span style={{ fontSize: 14, color: '#111111', fontWeight: 600 }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Safety note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#F0FAF5', borderRadius: 12, padding: '10px 14px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p style={{ fontSize: 12, color: '#16A34A', fontWeight: 500, margin: 0 }}>
            All meetups include a safety check-in
          </p>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          onClick={handleStart}
          style={{ width: '100%', height: 54, borderRadius: 14, backgroundColor: '#E8720C', color: '#FFFFFF', fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px', border: 'none', fontFamily: 'inherit', cursor: 'pointer', boxShadow: '0 4px 16px rgba(232,114,12,0.30)' }}
        >
          Start Chat
        </button>
        <button
          onClick={handleCancel}
          style={{ width: '100%', height: 48, borderRadius: 14, backgroundColor: 'transparent', color: '#888888', fontSize: 15, fontWeight: 500, border: '1.5px solid #EDEDED', fontFamily: 'inherit', cursor: 'pointer' }}
        >
          Not now
        </button>
      </div>
    </div>
  )
}
