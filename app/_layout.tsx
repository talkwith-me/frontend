import { defaultStyles } from '@/constants/Styles';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
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
    // 기본: HancomSans, 제공: BinggraeTaom, KW
    'hcs': require('../assets/fonts/HancomSans-Light_0.ttf'),
    'hcs-b': require('../assets/fonts/HancomSans-SemiBold_0.ttf'),
    'bt': require('../assets/fonts/BinggraeTaom.ttf'),
    'bt-b': require('../assets/fonts/BinggraeTaom-Bold.ttf'),
    'kw': require('../assets/fonts/KW_Light.ttf'),
    'kw-b': require('../assets/fonts/KW_Bold.ttf')
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return !loaded ? <></> : (
      <SafeAreaProvider>
        <RootLayoutNav />
      </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const [user, setUser] = useState<User>({} as User);
  const [book, setBook] = useState<Book>({} as Book);

  return (
    <SafeAreaView style={defaultStyles.safeAreaView}>
      <UserContext.Provider value={{user, setUser}}>
        <BookContext.Provider value={{book, setBook}}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)/intro" options={{ headerShown: false }} />
            <Stack.Screen name="(user)/login" options={{ headerShown: false }} />
            <Stack.Screen name="(user)/signup" options={{ headerShown: false }} />
          </Stack>
        </BookContext.Provider>
      </UserContext.Provider>
    </SafeAreaView>
  );
}
