import React from 'react'
import { TrustBadge } from '../../types'

interface BadgeProps {
  badge: TrustBadge
  compact?: boolean
}

function PhoneIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.55 5.55l1.67-1.67a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 14l.29 2.92z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

const iconMap = {
  phone: PhoneIcon,
  id: ShieldIcon,
  email: MailIcon,
}

export default function Badge({ badge, compact = false }: BadgeProps) {
  const Icon = iconMap[badge.type]
  return (
    <div className="flex items-center gap-1 rounded-full bg-teal-light px-2 py-0.5">
      <span className="text-teal">
        <Icon />
      </span>
      {!compact && (
        <span className="text-[10px] font-semibold text-teal leading-none">{badge.label}</span>
      )}
    </div>
  )
}
