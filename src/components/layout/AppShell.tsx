import React from 'react'
import TabBar from './TabBar'

interface AppShellProps {
  children: React.ReactNode
  showTabBar?: boolean
}

/**
 * AppShell — the single top-level layout container.
 *
 * Uses var(--app-height) (set by viewport.ts) instead of 100vh so the
 * shell height is anchored to the real screen size and never jumps when
 * the iOS keyboard opens/closes.
 *
 * overflow: hidden on both this element and the inner content wrapper
 * prevents any rubber-band / horizontal drift that lets the user drag
 * content outside the viewport.
 */
export default function AppShell({ children, showTabBar = false }: AppShellProps) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        /* Anchor to the stable app height, not the keyboard-shrunken innerHeight */
        height: 'var(--app-height, 100dvh)',
        overflow: 'hidden',
        backgroundColor: '#F8F6F3',
        /* Hard-prevent any transform that could scale content after keyboard dismiss */
        transform: 'none',
        willChange: 'auto',
      }}
    >
      {/* Screen area — flex-1 so it fills space above the tab bar */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          /* Don't let content bleed horizontally */
          maxWidth: '100%',
        }}
      >
        {children}
      </div>

      {showTabBar && <TabBar />}
    </div>
  )
}
