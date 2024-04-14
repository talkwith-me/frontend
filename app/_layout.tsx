import { defaultStyles } from '@/constants/Styles';
import { useFonts } from 'expo-font';
import { Stack, useRootNavigationState, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserApi from './api/UserApi';
import { Book } from './model/Book';
import { User } from './model/User';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);
export interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const BookContext = React.createContext<BookContextProps>({} as BookContextProps);
export interface BookContextProps {
  book: Book;
  setBook: React.Dispatch<React.SetStateAction<Book>>;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ngc': require('../assets/fonts/NanumGothicCoding-Regular.ttf'),
    'ngc-b': require('../assets/fonts/NanumGothicCoding-Bold.ttf'),
  });

  const router = useRouter();
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const [user, setUser] = useState<User>({} as User);
  const [book, setBook] = useState<Book>({} as Book);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      UserApi.findMyself().then((result) => {
        if (result.status == 200) {
          setUser(result.data.user);
          setBook(result.data.book);
          setIsLoading(false);
        } else {
          router.replace('/(user)/intro');
        }
      })
    }
  }, [loaded]);

  return (
    isLoading ? (<></>) :(
      <SafeAreaProvider>
        <UserContext.Provider value={{user, setUser}}>
          <BookContext.Provider value={{book, setBook}}>
            <RootLayoutNav />
          </BookContext.Provider>
        </UserContext.Provider>
      </SafeAreaProvider>
    )
  );
}

function RootLayoutNav() {
  return (
    <SafeAreaView style={defaultStyles.safeAreaView}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)/intro" options={{ headerShown: false }} />
          <Stack.Screen name="(user)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(user)/signup" options={{ headerShown: false }} />
        </Stack>
    </SafeAreaView>
  );
}
