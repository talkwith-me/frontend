import Loading from '@/components/Loading';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, StyleSheet, View } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface StringMap {
  [key: string]: string;
}

const Webview = () => {
  const { id } = useLocalSearchParams<{id: string}>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [urlMap, setUrlMap] = useState<StringMap>({
    '1': "https://talkwith-me.notion.site/14a1acd3b6454aa5a9ce0c342effec4e",
    '2': "https://walla.my/survey/Zil9upk9yTEDgDhUlUXg",
    '3': "https://walla.my/survey/MM2k1cwkRSpIq2Kut9Hb",
    '4': "https://www.latpeed.com/products/mHvBX"
  });
  const [url, setUrl] = useState('');

  const [urlTitleMap, setUrlTitleMap] = useState<StringMap>({
    '1': "공지사항",
    '2': "의견 보내기",
    '3': "문의사항",
    '4': "나와의 대화 출판하기"
  })
  const [title, setTitle] = useState('');

  const webviewRef = useRef<WebViewProps>(null);

  const backPress = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPress);
    };
  }, [backPress]);

  useEffect(() => {
    const url = urlMap[id];
    setUrl(url || '');
    const title = urlTitleMap[id];
    setTitle(title || '');
    setTimeout(() => setIsLoading(false), 1000);
  }, [id]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: title, headerBackTitleVisible: false }} />
      {isLoading ? 
        <Loading /> : 
        <WebView ref={webviewRef} style={styles.webview} source={{uri: url}} />}
    </View>
  );
};
  
export default Webview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});