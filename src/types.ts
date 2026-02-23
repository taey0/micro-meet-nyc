export type Intent =
  | 'Coffee'
  | 'Study'
  | 'Walk'
  | 'Work Sprint'
  | 'Gym'
  | 'Language Exchange'
  | 'Quick Chat'

export interface TrustBadge {
  type: 'phone' | 'id' | 'email'
  label: string
}

export interface MockUser {
  id: string
  firstName: string
  initials: string
  distanceMiles: number
  intents: Intent[]
  availableNow: boolean
  timeWindow: string
  badges: TrustBadge[]
  ratingAvg: number
  bio: string
  avatarColor: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
}

export interface ActiveSession {
  user: MockUser
  startedAt: Date
  endsAt: Date
  messages: Message[]
}

export type ReportReason =
  | 'Harassment'
  | 'Inappropriate content'
  | 'Spam'
  | 'Unsafe behavior'
  | 'Other'

export interface Report {
  id: string
  userId: string
  reason: ReportReason
  note: string
  timestamp: Date
}

export type Screen =
  | 'splash'
  | 'onboarding-location'
  | 'onboarding-intents'
  | 'onboarding-verify'
  | 'home'
  | 'match'
  | 'chat'
  | 'safety'
  | 'profile'
  | 'report'

export interface FilterState {
  distanceMi: number
  intents: Intent[]
  timeWindow: 'now' | 'tonight' | 'this_week'
  verifiedOnly: boolean
  idVerifiedOnly: boolean
}
