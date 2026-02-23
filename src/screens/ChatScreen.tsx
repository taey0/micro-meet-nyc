import React, { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'
import TimerPill from '../components/ui/TimerPill'
import Modal from '../components/ui/Modal'

function StarRating({ rating, onRate }: { rating: number; onRate: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onRate(s)}
          style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill={s <= (hover || rating) ? '#E8720C' : '#E0E0E0'} style={{ transition: 'fill 0.1s' }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function ChatScreen() {
  const { activeSession, sendMessage, setScreen, setShowSafetyCheck, showSafetyCheck, sessionRating, setSessionRating, endSession, setReportTargetUser } = useStore()
  const [input, setInput] = useState('')
  const [sessionEnded, setSessionEnded] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [showReportMenu, setShowReportMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSession?.messages])

  if (!activeSession) {
    return (
      <div className="screen-root flex flex-col h-full items-center justify-center" style={{ backgroundColor: '#F6F5F3', gap: 14, padding: '0 32px' }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#FEF3EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 17, fontWeight: 700, color: '#111111', margin: '0 0 6px' }}>No active session</p>
          <p style={{ fontSize: 14, color: '#888888', lineHeight: 1.5, margin: 0 }}>Request a meet from Nearby to start chatting.</p>
        </div>
        <button
          onClick={() => setScreen('home')}
          style={{ height: 46, paddingLeft: 24, paddingRight: 24, borderRadius: 12, backgroundColor: '#E8720C', color: '#FFFFFF', fontSize: 14, fontWeight: 700, border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
        >
          Browse Nearby
        </button>
      </div>
    )
  }

  const { user, endsAt, messages } = activeSession

  function handleSend() {
    const t = input.trim()
    if (!t) return
    sendMessage(t)
    setInput('')
  }

  function handleTimerExpire() { setSessionEnded(true); setShowRating(true) }
  function handleRatingDone() { setShowRating(false); setShowSafetyCheck(true) }
  function handleSafetyGood() { endSession(); setScreen('home') }
  function handleSafetyReport() { setReportTargetUser(user); setShowSafetyCheck(false); setScreen('report') }

  function fmtTime(d: Date) {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <div
      className="screen-root"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F6F5F3', overflow: 'hidden', touchAction: 'pan-y' }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 14px 10px',
        borderBottom: '1px solid #EDEDED',
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
      }}>
        <button
          onClick={() => setScreen('home')}
          style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: user.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{user.initials}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#111111', margin: 0, lineHeight: 1.2 }}>{user.firstName}</p>
          <p style={{ fontSize: 11, color: '#888888', margin: 0, fontWeight: 400 }}>{user.distanceMiles} mi away</p>
        </div>

        {!sessionEnded
          ? <TimerPill endsAt={endsAt} onExpire={handleTimerExpire} />
          : <span style={{ fontFamily: 'inherit', fontSize: 12, color: '#888888', backgroundColor: '#F0F0F0', padding: '4px 10px', borderRadius: 8, fontWeight: 600 }}>Done</span>
        }

        <button
          onClick={() => setShowReportMenu(true)}
          style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      {/* ── Messages ───────────────────────────────────────────── */}
      <div
        className="scroll-area"
        style={{
          flex: 1,
          padding: '14px 14px 10px',
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((msg) => {
            const isMe = msg.senderId === 'me'
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', gap: 8 }}>
                {!isMe && (
                  <div style={{ width: 26, height: 26, borderRadius: '50%', backgroundColor: user.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'flex-end' }}>
                    <span style={{ color: 'white', fontSize: 9, fontWeight: 700 }}>{user.initials}</span>
                  </div>
                )}
                <div style={{ maxWidth: '70%' }}>
                  <div style={{
                    padding: '9px 13px',
                    borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    backgroundColor: isMe ? '#E8720C' : '#FFFFFF',
                    color: isMe ? '#FFFFFF' : '#111111',
                    fontSize: 15,
                    lineHeight: 1.45,
                    fontWeight: 400,
                    border: isMe ? 'none' : '1px solid #EDEDED',
                  }}>
                    {msg.text}
                  </div>
                  <p style={{ fontSize: 10, color: '#BBBBBB', marginTop: 4, textAlign: isMe ? 'right' : 'left', fontWeight: 400 }}>
                    {fmtTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Composer ───────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)',
        borderTop: '1px solid #EDEDED',
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message"
          disabled={sessionEnded}
          style={{
            flex: 1, height: 42, borderRadius: 12,
            border: '1.5px solid #EDEDED',
            backgroundColor: '#F6F5F3',
            paddingLeft: 14, paddingRight: 14,
            fontSize: 16, color: '#111111',
            fontFamily: 'inherit', outline: 'none',
            opacity: sessionEnded ? 0.5 : 1,
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sessionEnded}
          style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            backgroundColor: input.trim() && !sessionEnded ? '#E8720C' : '#EDEDED',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: input.trim() && !sessionEnded ? 'pointer' : 'default',
            transition: 'background-color 0.12s',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !sessionEnded ? '#FFFFFF' : '#AAAAAA'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      {/* ── Rating modal ───────────────────────────────────────── */}
      <Modal open={showRating}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: '#FEF3EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8720C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111111', letterSpacing: '-0.4px', margin: '0 0 6px' }}>Session complete</h2>
            <p style={{ fontSize: 14, color: '#888888', margin: 0 }}>Rate your time with {user.firstName}</p>
          </div>
          <StarRating rating={sessionRating} onRate={setSessionRating} />
          <button
            onClick={handleRatingDone}
            disabled={sessionRating === 0}
            style={{
              width: '100%', height: 52, borderRadius: 13,
              backgroundColor: sessionRating > 0 ? '#E8720C' : '#EDEDED',
              color: sessionRating > 0 ? '#FFFFFF' : '#AAAAAA',
              fontSize: 15, fontWeight: 700, border: 'none', fontFamily: 'inherit',
              cursor: sessionRating > 0 ? 'pointer' : 'default',
            }}
          >
            Submit
          </button>
        </div>
      </Modal>

      {/* ── Safety modal ───────────────────────────────────────── */}
      <Modal open={showSafetyCheck}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111111', letterSpacing: '-0.4px', margin: '0 0 4px' }}>Are you safe?</h2>
            <p style={{ fontSize: 14, color: '#888888', margin: 0 }}>Quick check before we close out.</p>
          </div>
          <button
            onClick={handleSafetyGood}
            style={{ width: '100%', height: 52, borderRadius: 13, backgroundColor: '#16A34A', color: 'white', fontSize: 15, fontWeight: 700, border: 'none', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            All good
          </button>
          <button
            onClick={handleSafetyReport}
            style={{ width: '100%', height: 52, borderRadius: 13, backgroundColor: '#DC2626', color: 'white', fontSize: 15, fontWeight: 700, border: 'none', fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Report an issue
          </button>
        </div>
      </Modal>

      {/* ── Options menu ───────────────────────────────────────── */}
      <Modal open={showReportMenu} onClose={() => setShowReportMenu(false)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#111111', margin: '0 0 6px' }}>Options</p>
          <button
            onClick={() => { setShowReportMenu(false); setReportTargetUser(user); setScreen('report') }}
            style={{ width: '100%', height: 48, borderRadius: 12, backgroundColor: '#FFF0F0', color: '#DC2626', fontSize: 14, fontWeight: 600, border: '1px solid rgba(220,38,38,0.15)', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Report {user.firstName}
          </button>
          <button
            onClick={() => setShowReportMenu(false)}
            style={{ width: '100%', height: 44, borderRadius: 12, background: 'none', color: '#888888', fontSize: 14, fontWeight: 500, border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}
