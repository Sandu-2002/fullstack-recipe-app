import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors'

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
  tokenCache={tokenCache}>
    <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.background }} >
<Slot />
    </SafeAreaView>
    </ClerkProvider>
  )
}
