import React from 'react'
import { useStore } from '../store/useStore'
import { Intent } from '../types'

const ALL_INTENTS: Intent[] = ['Coffee', 'Study', 'Walk', 'Work Sprint', 'Gym', 'Language Exchange', 'Quick Chat']
const TIME_OPTIONS = [
  { value: 'now' as const, label: 'Right now' },
  { value: 'tonight' as const, label: 'Tonight' },
  { value: 'this_week' as const, label: 'This week' },
]

function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{ width: 44, height: 26, borderRadius: 999, backgroundColor: on ? '#E8720C' : '#DEDBD7', position: 'relative', flexShrink: 0, transition: 'background-color 0.2s' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.18)', transition: 'left 0.2s' }} />
    </div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return <p style={{ fontSize: 12, fontWeight: 600, color: '#888888', margin: '0 0 10px' }}>{text}</p>
}

export default function FilterSheet() {
  const { filter, setFilter, setShowFilterSheet } = useStore()

  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setShowFilterSheet(false) }}
    >
      <div
        className="sheet-enter"
        style={{ backgroundColor: '#FFFFFF', borderRadius: '20px 20px 0 0', maxHeight: '90%', display: 'flex', flexDirection: 'column', paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 32, height: 4, borderRadius: 99, backgroundColor: '#DDDDDD' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px', borderBottom: '1px solid #F0F0F0' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#111111' }}>Filter</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setFilter({ distanceMi: 2, intents: [], timeWindow: 'now', verifiedOnly: false, idVerifiedOnly: false })}
              style={{ height: 34, paddingLeft: 12, paddingRight: 12, borderRadius: 9, backgroundColor: '#F6F5F3', border: '1px solid #EDEDED', fontSize: 13, fontWeight: 600, color: '#111111', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilterSheet(false)}
              style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#F0F0F0', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="scroll-area" style={{ flex: 1, padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Distance */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <SectionLabel text="Distance" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#E8720C' }}>{filter.distanceMi} mi</span>
            </div>
            <input
              type="range" min={0.5} max={2} step={0.1}
              value={filter.distanceMi}
              onChange={(e) => setFilter({ distanceMi: parseFloat(e.target.value) })}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>0.5 mi</span>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>2 mi</span>
            </div>
          </div>

          {/* Activity */}
          <div>
            <SectionLabel text="Activity" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ALL_INTENTS.map((intent) => {
                const sel = filter.intents.includes(intent)
                return (
                  <button
                    key={intent}
                    onClick={() => setFilter({ intents: sel ? filter.intents.filter(i => i !== intent) : [...filter.intents, intent] })}
                    style={{
                      height: 38, paddingLeft: 14, paddingRight: 14, borderRadius: 999,
                      border: sel ? 'none' : '1.5px solid #EDEDED',
                      backgroundColor: sel ? '#E8720C' : '#F6F5F3',
                      color: sel ? '#FFFFFF' : '#111111',
                      fontSize: 13, fontWeight: sel ? 600 : 500, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >{intent}</button>
                )
              })}
            </div>
          </div>

          {/* Availability */}
          <div>
            <SectionLabel text="Availability" />
            <div style={{ display: 'flex', gap: 8 }}>
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter({ timeWindow: opt.value })}
                  style={{
                    flex: 1, height: 42, borderRadius: 10,
                    border: filter.timeWindow === opt.value ? 'none' : '1.5px solid #EDEDED',
                    backgroundColor: filter.timeWindow === opt.value ? '#E8720C' : '#F6F5F3',
                    color: filter.timeWindow === opt.value ? '#FFFFFF' : '#111111',
                    fontSize: 13, fontWeight: filter.timeWindow === opt.value ? 600 : 500, cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >{opt.label}</button>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div>
            <SectionLabel text="Trust Level" />
            <div style={{ backgroundColor: '#F6F5F3', borderRadius: 12, overflow: 'hidden', border: '1px solid #EDEDED' }}>
              {[
                { key: 'verifiedOnly' as const, label: 'Phone verified', desc: 'Phone-confirmed profiles only' },
                { key: 'idVerifiedOnly' as const, label: 'ID verified', desc: 'Government ID badge required' },
              ].map(({ key, label, desc }, idx) => (
                <button
                  key={key}
                  onClick={() => setFilter({ [key]: !filter[key] })}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', background: 'transparent', border: 'none', borderBottom: idx === 0 ? '1px solid #EDEDED' : 'none', fontFamily: 'inherit', cursor: 'pointer' }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#111111', margin: '0 0 2px' }}>{label}</p>
                    <p style={{ fontSize: 12, color: '#888888', margin: 0 }}>{desc}</p>
                  </div>
                  <Toggle on={filter[key]} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 20px 0' }}>
          <button
            onClick={() => setShowFilterSheet(false)}
            style={{ width: '100%', height: 54, borderRadius: 14, backgroundColor: '#111111', color: '#FFFFFF', fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
