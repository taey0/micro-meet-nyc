import React from 'react'
import { useStore } from '../../store/useStore'

const BRAND = '#E8720C'
const INACTIVE = '#BBBBBB'

function NearbyIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? BRAND : INACTIVE} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? BRAND : INACTIVE} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? BRAND : INACTIVE} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export default function TabBar() {
  const { activeTab, setTab, setScreen, activeSession } = useStore()

  const tabs = [
    { id: 'home' as const, label: 'Nearby', Icon: NearbyIcon },
    { id: 'chats' as const, label: 'Chat', Icon: ChatIcon },
    { id: 'profile' as const, label: 'Profile', Icon: ProfileIcon },
  ]

  function handleTab(id: typeof tabs[number]['id']) {
    setTab(id)
    if (id === 'chats') {
      if (activeSession) { setScreen('chat') }
      else { setTab('home'); setScreen('home') }
    } else if (id === 'home') {
      setScreen('home')
    } else {
      setScreen('profile')
    }
  }

  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #EDEDED',
      paddingBottom: 'max(env(safe-area-inset-bottom), 8px)',
      flexShrink: 0,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            onClick={() => handleTab(id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              paddingTop: 10, paddingBottom: 4, gap: 3,
              background: 'none', border: 'none', cursor: 'pointer', minHeight: 52,
            }}
          >
            <Icon active={active} />
            <span style={{
              fontSize: 10, fontWeight: active ? 700 : 500,
              color: active ? BRAND : INACTIVE,
              fontFamily: 'inherit', letterSpacing: '0.01em',
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
