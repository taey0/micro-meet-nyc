import React from 'react'
import { useStore } from './store/useStore'
import AppShell from './components/layout/AppShell'

// Screens
import SplashScreen from './screens/SplashScreen'
import OnboardingLocationScreen from './screens/OnboardingLocationScreen'
import OnboardingIntentsScreen from './screens/OnboardingIntentsScreen'
import OnboardingVerifyScreen from './screens/OnboardingVerifyScreen'
import HomeScreen from './screens/HomeScreen'
import MatchScreen from './screens/MatchScreen'
import ChatScreen from './screens/ChatScreen'
import SafetyScreen from './screens/SafetyScreen'
import ProfileScreen from './screens/ProfileScreen'
import ReportScreen from './screens/ReportScreen'

const SCREENS_WITH_TABBAR = ['home', 'chats', 'profile'] as const

export default function App() {
  const screen = useStore((s) => s.screen)

  const showTabBar = SCREENS_WITH_TABBAR.includes(screen as any)

  function renderScreen() {
    switch (screen) {
      case 'splash':
        return <SplashScreen />
      case 'onboarding-location':
        return <OnboardingLocationScreen />
      case 'onboarding-intents':
        return <OnboardingIntentsScreen />
      case 'onboarding-verify':
        return <OnboardingVerifyScreen />
      case 'home':
        return <HomeScreen />
      case 'match':
        return <MatchScreen />
      case 'chat':
        return <ChatScreen />
      case 'safety':
        return <SafetyScreen />
      case 'profile':
        return <ProfileScreen />
      case 'report':
        return <ReportScreen />
      default:
        return <SplashScreen />
    }
  }

  return (
    <AppShell showTabBar={showTabBar}>
      <div key={screen} className="absolute inset-0 flex flex-col" style={{ backgroundColor: '#F8F6F3', overflow: 'hidden' }}>
        {renderScreen()}
      </div>
    </AppShell>
  )
}
