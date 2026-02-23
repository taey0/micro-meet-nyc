import React from 'react'

interface StatusBarProps {
  time?: string
  dark?: boolean
}

export default function StatusBar({ time, dark = false }: StatusBarProps) {
  const now = new Date()
  const displayTime =
    time ||
    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const textColor = dark ? '#FFFFFF' : '#1A1A1A'

  return (
    <div
      className="flex items-center justify-between px-6 h-12"
      style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
    >
      {/* Time */}
      <span
        className="text-sm font-semibold tabular-nums"
        style={{ color: textColor, fontVariantNumeric: 'tabular-nums' }}
      >
        {displayTime}
      </span>

      {/* Right side icons */}
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="1" fill={textColor} />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill={textColor} />
          <rect x="9" y="2" width="3" height="10" rx="1" fill={textColor} />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill={textColor} />
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"
            fill={textColor}
          />
          <path
            d="M3.5 6.5A6.5 6.5 0 0 1 8 4.5a6.5 6.5 0 0 1 4.5 2"
            stroke={textColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1 3.5A10 10 0 0 1 8 1a10 10 0 0 1 7 2.5"
            stroke={textColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3.5"
            stroke={textColor}
            strokeOpacity="0.35"
          />
          <rect x="22.5" y="3.5" width="2" height="5" rx="1" fill={textColor} fillOpacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={textColor} />
        </svg>
      </div>
    </div>
  )
}
