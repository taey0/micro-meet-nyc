import React, { useState } from 'react'
import { useStore } from '../store/useStore'

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 44, height: 26, borderRadius: 999, backgroundColor: on ? '#E8720C' : '#DEDBD7', position: 'relative', flexShrink: 0, transition: 'background-color 0.2s' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.2s' }} />
    </div>
  )
}

export default function OnboardingVerifyScreen() {
  const { setScreen, phoneVerified, idVerified, emailVerified, setPhoneVerified, setIdVerified, setEmailVerified, completeOnboarding } = useStore()
  const [verifying, setVerifying] = useState(false)

  function handleVerifyPhone() {
    setVerifying(true)
    setTimeout(() => { setPhoneVerified(true); setVerifying(false) }, 900)
  }

  return (
    <div
      className="screen-enter screen-root flex flex-col h-full bg-bg"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
    >
      {/* Back + Progress */}
      <div style={{ padding: '8px 24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setScreen('onboarding-intents')}
          style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, backgroundColor: '#E8720C' }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 0', overflowY: 'auto' }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#FEF3EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111111', letterSpacing: '-0.6px', lineHeight: 1.2, margin: '0 0 8px' }}>
          Build trust.
        </h1>
        <p style={{ fontSize: 15, color: '#888888', margin: '0 0 28px', lineHeight: 1.5 }}>
          Verified profiles get 3× more meetups.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Phone — required */}
          <div style={{
            backgroundColor: phoneVerified ? '#FEF3EA' : '#FFFFFF',
            border: `1.5px solid ${phoneVerified ? '#E8720C' : '#EDEDED'}`,
            borderRadius: 14, padding: '14px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111111' }}>Phone Number</span>
                <span style={{ fontSize: 11, fontWeight: 600, backgroundColor: '#E8720C', color: '#FFFFFF', borderRadius: 6, padding: '2px 7px' }}>Required</span>
              </div>
              <span style={{ fontSize: 12, color: '#888888' }}>{phoneVerified ? 'Verified' : 'Needed to activate your account'}</span>
            </div>
            {phoneVerified ? (
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E8720C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckIcon />
              </div>
            ) : (
              <button
                onClick={handleVerifyPhone}
                disabled={verifying}
                style={{ height: 34, paddingLeft: 14, paddingRight: 14, borderRadius: 9, backgroundColor: '#111111', color: '#FFFFFF', fontSize: 13, fontWeight: 600, border: 'none', fontFamily: 'inherit', cursor: 'pointer', opacity: verifying ? 0.6 : 1 }}
              >
                {verifying ? '...' : 'Verify'}
              </button>
            )}
          </div>

          {/* ID */}
          <button
            onClick={() => setIdVerified(!idVerified)}
            style={{ backgroundColor: idVerified ? '#F0FAF5' : '#FFFFFF', border: `1.5px solid ${idVerified ? '#16A34A' : '#EDEDED'}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111111' }}>Government ID</span>
                <span style={{ fontSize: 11, fontWeight: 600, backgroundColor: '#EDEDED', color: '#888888', borderRadius: 6, padding: '2px 7px' }}>Optional</span>
              </div>
              <span style={{ fontSize: 12, color: '#888888' }}>Earn a visible trust badge</span>
            </div>
            <Toggle on={idVerified} />
          </button>

          {/* Email */}
          <button
            onClick={() => setEmailVerified(!emailVerified)}
            style={{ backgroundColor: emailVerified ? '#F0FAF5' : '#FFFFFF', border: `1.5px solid ${emailVerified ? '#16A34A' : '#EDEDED'}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111111' }}>Work or School Email</span>
                <span style={{ fontSize: 11, fontWeight: 600, backgroundColor: '#EDEDED', color: '#888888', borderRadius: 6, padding: '2px 7px' }}>Optional</span>
              </div>
              <span style={{ fontSize: 12, color: '#888888' }}>Adds credibility to your profile</span>
            </div>
            <Toggle on={emailVerified} />
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 24px 0' }}>
        {!phoneVerified ? (
          <button
            onClick={handleVerifyPhone}
            disabled={verifying}
            style={{ width: '100%', height: 54, borderRadius: 14, backgroundColor: '#E8720C', color: '#FFFFFF', fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px', border: 'none', fontFamily: 'inherit', cursor: 'pointer', opacity: verifying ? 0.6 : 1 }}
          >
            {verifying ? 'Sending code...' : 'Verify Phone to Continue'}
          </button>
        ) : (
          <button
            onClick={() => { completeOnboarding(); setScreen('home') }}
            style={{ width: '100%', height: 54, borderRadius: 14, backgroundColor: '#E8720C', color: '#FFFFFF', fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Finish Setup
          </button>
        )}
      </div>
    </div>
  )
}
