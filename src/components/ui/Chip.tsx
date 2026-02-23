import React from 'react'
import { Intent } from '../../types'

interface ChipProps {
  label: Intent | string
  selected?: boolean
  onPress?: () => void
  disabled?: boolean
}

export default function Chip({ label, selected = false, onPress, disabled = false }: ChipProps) {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold
        min-h-[44px] transition-all duration-150 border
        ${selected
          ? 'bg-teal text-white border-teal'
          : 'bg-surface text-ink border-border hover:border-teal/40'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
      `}
    >
      {label}
    </button>
  )
}
