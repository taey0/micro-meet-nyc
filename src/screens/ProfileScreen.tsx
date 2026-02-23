import React from 'react'
import { useStore } from '../store/useStore'
import { Intent } from '../types'

const ALL_INTENTS: Intent[] = ['Coffee', 'Study', 'Walk', 'Work Sprint', 'Gym', 'Language Exchange', 'Quick Chat']

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 600, color: '#888888', letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 10px' }}>{text}</p>
  )
}

const SETTINGS = [
  { label: 'Notifications', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { label: 'Privacy', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { label: 'Help & Support', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
]

export default function ProfileScreen() {
  const { me, reports, blockedUserIds, allUsers, selectedIntents, toggleIntent } = useStore()
  const blockedUsers = allUsers.filter((u) => blockedUserIds.includes(u.id))

  return (
    <div className="screen-root flex flex-col h-full" style={{ backgroundColor: '#F6F5F3' }}>
      <div className="scroll-area" style={{ flex: 1, padding: '0 16px 20px' }}>

        {/* Hero card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, border: '1px solid #EDEDED', padding: '24px 20px 20px', marginBottom: 24, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            backgroundColor: me.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          }}>
            <span style={{ color: 'white', fontSize: 26, fontWeight: 700, letterSpacing: '-0.8px' }}>{me.initials}</span>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111111', letterSpacing: '-0.4px', margin: '0 0 4px' }}>{me.firstName}</h1>
          <p style={{ fontSize: 13, color: '#888888', textAlign: 'center', lineHeight: 1.5, margin: '0 0 10px', maxWidth: 240 }}>{me.bio}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= Math.floor(me.ratingAvg) ? '#E8720C' : '#DDDDDD'}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111111', marginLeft: 4 }}>{me.ratingAvg.toFixed(1)}</span>
          </div>
        </div>

        {/* Activities */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel text="Activities" />
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #EDEDED', padding: '14px 16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ALL_INTENTS.map((intent) => {
                const sel = selectedIntents.includes(intent)
                const maxed = selectedIntents.length >= 3 && !sel
                return (
                  <button
                    key={intent}
                    onClick={() => !maxed && toggleIntent(intent)}
                    style={{
                      height: 36, paddingLeft: 14, paddingRight: 14, borderRadius: 999,
                      border: sel ? 'none' : '1.5px solid #EDEDED',
                      backgroundColor: sel ? '#E8720C' : '#F6F5F3',
                      color: sel ? '#FFFFFF' : '#111111',
                      fontSize: 13, fontWeight: sel ? 600 : 500,
                      opacity: maxed ? 0.3 : 1,
                      cursor: maxed ? 'default' : 'pointer', fontFamily: 'inherit',
                    }}
                  >{intent}</button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Trust */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel text="Verifications" />
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #EDEDED', overflow: 'hidden' }}>
            {me.badges.length === 0 ? (
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style={{ fontSize: 14, color: '#AAAAAA', margin: 0 }}>No verifications yet.</p>
              </div>
            ) : me.badges.map((badge, idx) => (
              <div key={badge.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: idx < me.badges.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#111111' }}>{badge.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blocked */}
        {blockedUsers.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <SectionLabel text="Blocked Users" />
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #EDEDED', overflow: 'hidden' }}>
              {blockedUsers.map((u, idx) => (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: idx < blockedUsers.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: u.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{u.initials}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#111111', flex: 1 }}>{u.firstName}</span>
                  <span style={{ fontSize: 12, color: '#AAAAAA' }}>Blocked</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel text="Settings" />
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, border: '1px solid #EDEDED', overflow: 'hidden' }}>
            {SETTINGS.map(({ label, icon }, idx) => (
              <button
                key={label}
                style={{
                  width: '100%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 16px', background: 'transparent', border: 'none',
                  borderBottom: idx < SETTINGS.length - 1 ? '1px solid #F0F0F0' : 'none',
                  fontFamily: 'inherit', cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {icon}
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#111111' }}>{label}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
