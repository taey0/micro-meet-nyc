import React from 'react'
import { useStore } from '../store/useStore'
import { Intent } from '../types'

const ALL_INTENTS: Intent[] = ['Coffee', 'Study', 'Walk', 'Work Sprint', 'Gym', 'Language Exchange', 'Quick Chat']

export default function OnboardingIntentsScreen() {
  const { setScreen, selectedIntents, toggleIntent } = useStore()
  const canContinue = selectedIntents.length >= 1

  return (
    <div
      className="screen-enter screen-root flex flex-col h-full bg-bg"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
    >
      {/* Back + Progress */}
      <div style={{ padding: '8px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setScreen('onboarding-location')}
          style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, backgroundColor: i <= 1 ? '#E8720C' : '#E0DDD9' }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 0' }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#FEF3EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111111', letterSpacing: '-0.6px', lineHeight: 1.2, margin: '0 0 8px' }}>
          What are you up for?
        </h1>
        <p style={{ fontSize: 15, color: '#888888', margin: '0 0 28px', lineHeight: 1.5 }}>
          Pick up to 3. Used to match you better.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ALL_INTENTS.map((intent) => {
            const sel = selectedIntents.includes(intent)
            const maxed = selectedIntents.length >= 3 && !sel
            return (
              <button
                key={intent}
                disabled={maxed}
                onClick={() => toggleIntent(intent)}
                style={{
                  height: 42,
                  paddingLeft: 18,
                  paddingRight: 18,
                  borderRadius: 999,
                  border: sel ? 'none' : '1.5px solid #EDEDED',
                  backgroundColor: sel ? '#E8720C' : '#FFFFFF',
                  color: sel ? '#FFFFFF' : '#111111',
                  fontSize: 14,
                  fontWeight: sel ? 600 : 500,
                  opacity: maxed ? 0.3 : 1,
                  cursor: maxed ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.12s',
                }}
              >
                {intent}
              </button>
            )
          })}
        </div>

        <p style={{ fontSize: 13, color: '#AAAAAA', marginTop: 16 }}>
          {selectedIntents.length}/3 selected
        </p>
      </div>

      <div style={{ padding: '0 24px' }}>
        <button
          disabled={!canContinue}
          onClick={() => setScreen('onboarding-verify')}
          style={{
            width: '100%', height: 54, borderRadius: 14,
            backgroundColor: canContinue ? '#E8720C' : '#EDEDED',
            color: canContinue ? '#FFFFFF' : '#AAAAAA',
            fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px',
            border: 'none', cursor: canContinue ? 'pointer' : 'default', fontFamily: 'inherit',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
