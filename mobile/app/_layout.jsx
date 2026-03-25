import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Slot } from 'expo-router'
import SafeScreen from "@/components/SafeScreen"

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
  tokenCache={tokenCache}>
    <SafeScreen>
<Slot />
    </SafeScreen>

    </ClerkProvider>
  )
}
