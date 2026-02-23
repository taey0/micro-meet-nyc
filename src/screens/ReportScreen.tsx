import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { ReportReason } from '../types'

const REASONS: ReportReason[] = ['Harassment', 'Inappropriate content', 'Spam', 'Unsafe behavior', 'Other']

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 44, height: 26, borderRadius: 999, backgroundColor: on ? '#E8720C' : '#DEDBD7', position: 'relative', flexShrink: 0, transition: 'background-color 0.2s' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.2s' }} />
    </div>
  )
}

export default function ReportScreen() {
  const { reportTargetUser, submitReport, setScreen, setReportTargetUser, blockUser } = useStore()
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null)
  const [note, setNote] = useState('')
  const [doBlock, setDoBlock] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const user = reportTargetUser

  function handleSubmit() {
    if (!selectedReason || !user) return
    submitReport(user.id, selectedReason, note)
    if (doBlock) blockUser(user.id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="screen-enter screen-root flex flex-col h-full items-center justify-center px-6"
        style={{ backgroundColor: '#F6F5F3', paddingBottom: 'max(env(safe-area-inset-bottom), 40px)', gap: 20 }}
      >
        <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#F0FAF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111111', letterSpacing: '-0.5px', margin: '0 0 8px' }}>Report submitted</h2>
          <p style={{ fontSize: 15, color: '#888888', lineHeight: 1.6, maxWidth: 260, margin: 0 }}>
            We'll review this within 24 hours.{doBlock ? ` ${user?.firstName} has been blocked.` : ''}
          </p>
        </div>
        <button
          onClick={() => { setReportTargetUser(null); setScreen('home') }}
          style={{ width: '100%', maxWidth: 340, height: 54, borderRadius: 14, backgroundColor: '#E8720C', color: '#FFFFFF', fontSize: 16, fontWeight: 700, border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
        >
          Back to Nearby
        </button>
      </div>
    )
  }

  return (
    <div
      className="screen-enter screen-root flex flex-col h-full"
      style={{ backgroundColor: '#F6F5F3', paddingBottom: 'max(env(safe-area-inset-bottom), 40px)' }}
    >
      {/* Nav */}
      <div style={{ padding: '6px 16px 0' }}>
        <button
          onClick={() => setScreen('home')}
          style={{ height: 44, display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#888888', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', padding: '0 4px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
      </div>

      <div className="scroll-area" style={{ flex: 1, padding: '8px 20px 0' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111111', letterSpacing: '-0.5px', margin: '0 0 4px' }}>
          Report {user?.firstName ?? 'User'}
        </h1>
        <p style={{ fontSize: 14, color: '#888888', margin: '0 0 24px', lineHeight: 1.5 }}>All reports are confidential and reviewed by our team.</p>

        <p style={{ fontSize: 11, fontWeight: 600, color: '#888888', letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 10px' }}>Select a reason</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
                borderRadius: 12,
                backgroundColor: selectedReason === reason ? '#FEF3EA' : '#FFFFFF',
                border: `1.5px solid ${selectedReason === reason ? '#E8720C' : '#EDEDED'}`,
                fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left', width: '100%',
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                border: `2px solid ${selectedReason === reason ? '#E8720C' : '#CCCCCC'}`,
                backgroundColor: selectedReason === reason ? '#E8720C' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selectedReason === reason && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'white' }} />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: selectedReason === reason ? '#E8720C' : '#111111' }}>{reason}</span>
            </button>
          ))}
        </div>

        <p style={{ fontSize: 11, fontWeight: 600, color: '#888888', letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 10px' }}>Additional context</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What happened? (optional)"
          rows={3}
          style={{ width: '100%', borderRadius: 12, border: '1.5px solid #EDEDED', padding: '13px 14px', fontSize: 15, color: '#111111', fontFamily: 'inherit', resize: 'none', backgroundColor: '#FFFFFF', marginBottom: 14, outline: 'none', lineHeight: 1.5 }}
        />

        <button
          onClick={() => setDoBlock(!doBlock)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', border: '1.5px solid #EDEDED', borderRadius: 12, padding: '14px 16px', fontFamily: 'inherit', cursor: 'pointer' }}
        >
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#111111', margin: '0 0 2px' }}>Block {user?.firstName ?? 'this user'}</p>
            <p style={{ fontSize: 12, color: '#888888', margin: 0 }}>Remove from your Nearby feed</p>
          </div>
          <Toggle on={doBlock} />
        </button>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <button
          onClick={handleSubmit}
          disabled={!selectedReason}
          style={{
            width: '100%', height: 54, borderRadius: 14,
            backgroundColor: selectedReason ? '#DC2626' : '#EDEDED',
            color: selectedReason ? 'white' : '#AAAAAA',
            fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px',
            border: 'none', fontFamily: 'inherit',
            cursor: selectedReason ? 'pointer' : 'default',
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  )
}
