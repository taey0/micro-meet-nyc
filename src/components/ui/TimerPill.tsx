import React, { useEffect, useState } from 'react'

interface TimerPillProps {
  endsAt: Date
  onExpire?: () => void
}

export default function TimerPill({ endsAt, onExpire }: TimerPillProps) {
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, Math.floor((endsAt.getTime() - Date.now()) / 1000))
      setRemaining(diff)
      if (diff === 0) onExpire?.()
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [endsAt, onExpire])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  const isLow = remaining < 300 && remaining > 0

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      paddingLeft: 10, paddingRight: 10, height: 30, borderRadius: 8,
      backgroundColor: isLow ? '#FFF0F0' : '#F0F0F0',
      flexShrink: 0,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isLow ? '#DC2626' : '#22C55E' }} />
      <span style={{
        fontFamily: "'SF Mono', 'Courier New', monospace",
        fontSize: 13, fontWeight: 600,
        color: isLow ? '#DC2626' : '#333333',
        letterSpacing: '0.02em',
        minWidth: 38, textAlign: 'center',
      }}>
        {display}
      </span>
    </div>
  )
}
