import React from 'react'
import { MockUser } from '../../types'
import { useStore } from '../../store/useStore'

export default function UserCard({ user }: { user: MockUser }) {
  const setPendingMatch = useStore((s) => s.setPendingMatch)
  const setScreen = useStore((s) => s.setScreen)

  function handleRequest() {
    setPendingMatch(user)
    setScreen('match')
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      border: '1px solid #EDEDED',
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {/* Top row: avatar + name + distance */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            backgroundColor: user.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: 16, fontWeight: 700, letterSpacing: '-0.4px' }}>{user.initials}</span>
          </div>
          {user.availableNow && (
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22C55E', border: '2px solid #FFFFFF' }} />
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#111111', letterSpacing: '-0.3px' }}>{user.firstName}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#E8720C">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#111111' }}>{user.ratingAvg.toFixed(1)}</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#888888', margin: 0, marginTop: 1 }}>
            {user.distanceMiles} mi · {user.intents.join(', ')}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {user.availableNow ? (
          <span style={{ height: 24, paddingLeft: 9, paddingRight: 9, borderRadius: 999, backgroundColor: '#FEF3EA', color: '#E8720C', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#E8720C' }} />
            Available now
          </span>
        ) : (
          <span style={{ height: 24, paddingLeft: 9, paddingRight: 9, borderRadius: 999, backgroundColor: '#F0F0F0', color: '#888888', fontSize: 11, fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
            {user.timeWindow}
          </span>
        )}
        {user.badges.map((b) => (
          <span key={b.type} style={{ height: 24, paddingLeft: 9, paddingRight: 9, borderRadius: 999, backgroundColor: '#F0FAF5', color: '#16A34A', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {b.type === 'phone' ? 'Phone' : b.type === 'id' ? 'ID' : 'Email'}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleRequest}
        style={{
          width: '100%', height: 46, borderRadius: 12,
          backgroundColor: '#E8720C', color: '#FFFFFF',
          fontSize: 14, fontWeight: 700, letterSpacing: '-0.2px',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        Request Meet
      </button>
    </div>
  )
}
