import React from 'react'
import { useStore } from '../store/useStore'
import UserCard from '../components/ui/UserCard'
import FilterSheet from './FilterSheet'

export default function HomeScreen() {
  const { filteredUsers, showFilterSheet, setShowFilterSheet, filter, setFilter, me, updateMe } = useStore()
  const users = filteredUsers()
  const hasActiveFilters = filter.intents.length > 0 || filter.verifiedOnly || filter.idVerifiedOnly || filter.distanceMi < 2 || filter.timeWindow !== 'now'

  return (
    <div className="screen-root flex flex-col h-full" style={{ backgroundColor: '#F6F5F3' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 10px', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111111', letterSpacing: '-0.5px', lineHeight: 1, margin: '0 0 3px' }}>
            Nearby
          </h1>
          <p style={{ fontSize: 13, color: '#888888', margin: 0, fontWeight: 400 }}>
            {users.length} {users.length === 1 ? 'person' : 'people'} available
          </p>
        </div>

        <button
          onClick={() => setShowFilterSheet(true)}
          style={{
            width: 42, height: 42, borderRadius: 12,
            border: hasActiveFilters ? 'none' : '1.5px solid #EDEDED',
            backgroundColor: hasActiveFilters ? '#E8720C' : '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', position: 'relative',
            boxShadow: hasActiveFilters ? '0 2px 12px rgba(232,114,12,0.28)' : 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hasActiveFilters ? '#FFF' : '#111111'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          {hasActiveFilters && (
            <div style={{ position: 'absolute', top: -3, right: -3, width: 9, height: 9, borderRadius: '50%', backgroundColor: '#111111', border: '1.5px solid #F6F5F3' }} />
          )}
        </button>
      </div>

      {/* List */}
      <div className="scroll-area" style={{ flex: 1, padding: '4px 16px 120px' }}>
        {users.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#111111', margin: '0 0 6px' }}>No one matches</p>
              <p style={{ fontSize: 14, color: '#888888', maxWidth: 220, lineHeight: 1.5, margin: 0 }}>Try adjusting your filters.</p>
            </div>
            <button
              onClick={() => setFilter({ distanceMi: 2, intents: [], timeWindow: 'now', verifiedOnly: false, idVerifiedOnly: false })}
              style={{ height: 40, paddingLeft: 20, paddingRight: 20, borderRadius: 10, backgroundColor: '#111111', color: '#FFFFFF', fontSize: 14, fontWeight: 600, border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {users.map((user) => <UserCard key={user.id} user={user} />)}
          </div>
        )}
      </div>

      {/* Available Now FAB */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 16px',
        paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
        background: 'linear-gradient(to top, #F6F5F3 60%, transparent)',
        pointerEvents: 'none',
      }}>
        <button
          onClick={() => updateMe({ availableNow: !me.availableNow })}
          style={{
            width: '100%', height: 54, borderRadius: 16,
            backgroundColor: me.availableNow ? '#E8720C' : '#FFFFFF',
            border: me.availableNow ? 'none' : '1.5px solid #EDEDED',
            color: me.availableNow ? '#FFFFFF' : '#111111',
            fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            pointerEvents: 'all', fontFamily: 'inherit', cursor: 'pointer',
            boxShadow: me.availableNow ? '0 4px 16px rgba(232,114,12,0.30)' : '0 1px 4px rgba(0,0,0,0.07)',
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: me.availableNow ? 'rgba(255,255,255,0.75)' : '#CCCCCC' }} />
          {me.availableNow ? 'You\'re available' : 'Go available now'}
        </button>
      </div>

      {showFilterSheet && <FilterSheet />}
    </div>
  )
}
