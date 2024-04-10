import { defaultStyles } from '@/constants/Styles';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ngc': require('../assets/fonts/NanumGothicCoding-Regular.ttf'),
    'ngc-b': require('../assets/fonts/NanumGothicCoding-Bold.ttf'),
  });

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // API 호출해서 storage에서 정보 넣어주던가 하기
      setIsLoading(false);
      // setTimeout(() => {
      //   router.push('/(modals)/login')
      // }, 1000)
    }
  }, [loaded]);

  return (
    isLoading ? <></> :
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  return (
    <SafeAreaView style={defaultStyles.safeAreaView}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
