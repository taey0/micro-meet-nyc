import React from 'react'

interface ModalProps {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null
  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.40)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '0 16px max(env(safe-area-inset-bottom, 0px), 20px)',
      }}
      onClick={onClose}
    >
      <div
        className="modal-enter w-full"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: '22px 20px',
          maxWidth: 420,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
