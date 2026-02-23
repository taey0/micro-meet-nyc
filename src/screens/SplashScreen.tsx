import React from 'react'
import { useStore } from '../store/useStore'

export default function SplashScreen() {
  const setScreen = useStore((s) => s.setScreen)
  const onboardingComplete = useStore((s) => s.onboardingComplete)

  return (
    <div
      className="screen-enter screen-root flex flex-col h-full"
      style={{ backgroundColor: '#111111', paddingBottom: 'max(env(safe-area-inset-bottom), 48px)' }}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* App icon */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 26,
            background: 'linear-gradient(145deg, #F07030 0%, #D46008 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
            boxShadow: '0 8px 32px rgba(232,114,12,0.40)',
          }}
        >
          <span style={{
            fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-3px',
            lineHeight: 1,
            display: 'block',
          }}>45</span>
        </div>

        <h1 style={{
          fontFamily: "-apple-system, 'Helvetica Neue', Arial, sans-serif",
          fontSize: 34,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.8px',
          lineHeight: 1.2,
          textAlign: 'center',
          margin: '0 0 12px',
        }}>
          Meet someone real.{'\n'}Right now.
        </h1>

        <p style={{ color: '#666666', fontSize: 16, fontWeight: 400, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          45 minutes. Nearby. No pressure.
        </p>
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => onboardingComplete ? setScreen('home') : setScreen('onboarding-location')}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            background: '#E8720C',
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: '-0.3px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Get Started
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#444444', lineHeight: 1.5, margin: 0 }}>
          By continuing you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  )
}
