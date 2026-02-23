import React, { useEffect, useRef } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleBackdropClick(e: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleBackdropClick)
    return () => document.removeEventListener('mousedown', handleBackdropClick)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{
        backgroundColor: 'rgba(26,26,26,0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        ref={sheetRef}
        className="sheet-enter bg-surface rounded-t-3xl shadow-sheet flex flex-col"
        style={{ maxHeight: '90%', paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 pb-4 flex-shrink-0 border-b border-border">
            <span className="text-base font-bold text-ink">{title}</span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-border flex items-center justify-center active:opacity-70"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="scroll-area flex-1 px-6 pt-4">{children}</div>
      </div>
    </div>
  )
}
