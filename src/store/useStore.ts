import { create } from 'zustand'
import { Intent, MockUser, FilterState, ActiveSession, Message, Report, ReportReason, Screen } from '../types'
import { MOCK_USERS, MOCK_ME } from '../data/mockUsers'
import { getMockMessages } from '../data/mockMessages'

interface AppState {
  // Navigation
  screen: Screen
  previousScreen: Screen | null
  activeTab: 'home' | 'chats' | 'profile'
  setScreen: (screen: Screen) => void
  setTab: (tab: 'home' | 'chats' | 'profile') => void

  // Onboarding
  onboardingComplete: boolean
  locationEnabled: boolean
  selectedIntents: Intent[]
  phoneVerified: boolean
  idVerified: boolean
  emailVerified: boolean
  setLocationEnabled: (v: boolean) => void
  toggleIntent: (intent: Intent) => void
  setPhoneVerified: (v: boolean) => void
  setIdVerified: (v: boolean) => void
  setEmailVerified: (v: boolean) => void
  completeOnboarding: () => void

  // Filter
  filter: FilterState
  showFilterSheet: boolean
  setFilter: (f: Partial<FilterState>) => void
  setShowFilterSheet: (v: boolean) => void

  // Users
  allUsers: MockUser[]
  blockedUserIds: string[]
  filteredUsers: () => MockUser[]
  blockUser: (userId: string) => void

  // Session / Match
  pendingMatch: MockUser | null
  activeSession: ActiveSession | null
  setPendingMatch: (user: MockUser | null) => void
  startSession: (user: MockUser) => void
  endSession: () => void
  sendMessage: (text: string) => void

  // Safety / Reports
  showSafetyCheck: boolean
  sessionRating: number
  reports: Report[]
  setShowSafetyCheck: (v: boolean) => void
  setSessionRating: (n: number) => void
  submitReport: (userId: string, reason: ReportReason, note: string) => void

  // Report screen target
  reportTargetUser: MockUser | null
  setReportTargetUser: (u: MockUser | null) => void

  // Me
  me: MockUser
  updateMe: (partial: Partial<MockUser>) => void
}

export const useStore = create<AppState>((set, get) => ({
  // Navigation
  screen: 'splash',
  previousScreen: null,
  activeTab: 'home',
  setScreen: (screen) =>
    set((s) => ({ previousScreen: s.screen, screen })),
  setTab: (tab) => set({ activeTab: tab }),

  // Onboarding
  onboardingComplete: false,
  locationEnabled: false,
  selectedIntents: [],
  phoneVerified: false,
  idVerified: false,
  emailVerified: false,
  setLocationEnabled: (v) => set({ locationEnabled: v }),
  toggleIntent: (intent) =>
    set((s) => {
      const has = s.selectedIntents.includes(intent)
      if (has) return { selectedIntents: s.selectedIntents.filter((i) => i !== intent) }
      if (s.selectedIntents.length >= 3) return {}
      return { selectedIntents: [...s.selectedIntents, intent] }
    }),
  setPhoneVerified: (v) => set({ phoneVerified: v }),
  setIdVerified: (v) => set({ idVerified: v }),
  setEmailVerified: (v) => set({ emailVerified: v }),
  completeOnboarding: () => set({ onboardingComplete: true }),

  // Filter
  filter: {
    distanceMi: 2,
    intents: [],
    timeWindow: 'now',
    verifiedOnly: false,
    idVerifiedOnly: false,
  },
  showFilterSheet: false,
  setFilter: (f) => set((s) => ({ filter: { ...s.filter, ...f } })),
  setShowFilterSheet: (v) => set({ showFilterSheet: v }),

  // Users
  allUsers: MOCK_USERS,
  blockedUserIds: [],
  filteredUsers: () => {
    const { allUsers, filter, blockedUserIds } = get()
    return allUsers.filter((u) => {
      if (blockedUserIds.includes(u.id)) return false
      if (u.distanceMiles > filter.distanceMi) return false
      if (filter.intents.length > 0) {
        const hasIntent = filter.intents.some((i) => u.intents.includes(i))
        if (!hasIntent) return false
      }
      if (filter.timeWindow === 'now' && !u.availableNow) return false
      if (filter.timeWindow === 'tonight' && !['Now — 45 min', 'Tonight'].includes(u.timeWindow)) return false
      if (filter.verifiedOnly && !u.badges.some((b) => b.type === 'phone')) return false
      if (filter.idVerifiedOnly && !u.badges.some((b) => b.type === 'id')) return false
      return true
    })
  },
  blockUser: (userId) =>
    set((s) => ({ blockedUserIds: [...s.blockedUserIds, userId] })),

  // Session / Match
  pendingMatch: null,
  activeSession: null,
  setPendingMatch: (user) => set({ pendingMatch: user }),
  startSession: (user) => {
    const now = new Date()
    const endsAt = new Date(now.getTime() + 45 * 60 * 1000)
    set({
      activeSession: {
        user,
        startedAt: now,
        endsAt,
        messages: getMockMessages(user.id),
      },
      pendingMatch: null,
    })
  },
  endSession: () => set({ activeSession: null, showSafetyCheck: false, sessionRating: 0 }),
  sendMessage: (text) =>
    set((s) => {
      if (!s.activeSession) return {}
      const msg: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'me',
        text,
        timestamp: new Date(),
      }
      return {
        activeSession: {
          ...s.activeSession,
          messages: [...s.activeSession.messages, msg],
        },
      }
    }),

  // Safety
  showSafetyCheck: false,
  sessionRating: 0,
  reports: [],
  setShowSafetyCheck: (v) => set({ showSafetyCheck: v }),
  setSessionRating: (n) => set({ sessionRating: n }),
  submitReport: (userId, reason, note) => {
    const report: Report = {
      id: `r-${Date.now()}`,
      userId,
      reason,
      note,
      timestamp: new Date(),
    }
    set((s) => ({
      reports: [...s.reports, report],
      blockedUserIds: [...s.blockedUserIds, userId],
    }))
  },

  // Report target
  reportTargetUser: null,
  setReportTargetUser: (u) => set({ reportTargetUser: u }),

  // Me
  me: MOCK_ME,
  updateMe: (partial) =>
    set((s) => ({ me: { ...s.me, ...partial } })),
}))
