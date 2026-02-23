import React from 'react'

interface ButtonProps {
  label: string
  onPress?: () => void
  disabled?: boolean
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export function ButtonPrimary({ label, onPress, disabled, fullWidth, size = 'lg', icon }: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-6 py-4 text-base',
  }
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        ${sizeClasses[size]}
        rounded-2xl font-semibold
        bg-teal text-white
        transition-all duration-150
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.97] hover:bg-teal-dark'}
        ${fullWidth ? 'w-full' : ''}
        min-h-[52px]
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}

export function ButtonSecondary({ label, onPress, disabled, fullWidth, size = 'lg', icon }: ButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-6 py-4 text-base',
  }
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2
        ${sizeClasses[size]}
        rounded-2xl font-semibold
        bg-surface text-ink border border-border
        transition-all duration-150
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.97] hover:border-ink/30'}
        ${fullWidth ? 'w-full' : ''}
        min-h-[52px]
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}

interface TextButtonProps {
  label: string
  onPress?: () => void
  color?: string
}

export function TextButton({ label, onPress, color = '#6B7280' }: TextButtonProps) {
  return (
    <button
      onClick={onPress}
      className="text-sm font-semibold min-h-[44px] px-2 active:opacity-60 transition-opacity"
      style={{ color }}
    >
      {label}
    </button>
  )
}
