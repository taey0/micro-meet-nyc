import React from 'react'
import { useStore } from '../store/useStore'

export default function SafetyScreen() {
  const { activeSession, endSession, setScreen, setReportTargetUser, setShowSafetyCheck } = useStore()
  const user = activeSession?.user

  function handleGood() { endSession(); setScreen('home') }
  function handleReport() {
    if (user) setReportTargetUser(user)
    setShowSafetyCheck(false)
    endSession()
    setScreen('report')
  }

  return (
    <div
      className="screen-enter screen-root flex flex-col h-full"
      style={{ backgroundColor: '#F6F5F3', paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
    >
      {/* Back */}
      <div style={{ padding: '6px 16px 0' }}>
        <button
          onClick={() => setScreen('chat')}
          style={{ height: 44, display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#888888', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', padding: '0 4px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
      </div>

      <div style={{ padding: '16px 20px', flex: '0 0 auto' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111111', letterSpacing: '-0.6px', margin: '0 0 6px' }}>
          Safety check
        </h1>
        <p style={{ fontSize: 15, color: '#888888', margin: 0 }}>
          Your 45-minute session with {user?.firstName ?? 'your match'} has ended.
        </p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px', gap: 12 }}>
        {/* All good */}
        <button
          onClick={handleGood}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            backgroundColor: '#16A34A', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 20px rgba(22,163,74,0.22)',
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'white', fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', margin: '0 0 4px', fontFamily: 'inherit' }}>All good</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: 0, fontFamily: 'inherit' }}>End and go home</p>
          </div>
        </button>

        {/* Report */}
        <button
          onClick={handleReport}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
            backgroundColor: '#DC2626', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 20px rgba(220,38,38,0.22)',
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'white', fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', margin: '0 0 4px', fontFamily: 'inherit' }}>Report issue</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: 0, fontFamily: 'inherit' }}>Something went wrong</p>
          </div>
        </button>
      </div>
    </div>
  )
}
