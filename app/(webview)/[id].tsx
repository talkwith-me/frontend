import React, {useEffect, useState} from 'react'
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { Stack } from 'expo-router'
import Loading from '@/components/Loading';

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
    '2': "https://walla.my/talkwith-me-suggestions",
    '3': "https://walla.my/talkwith-me-cs",
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
      {isLoading ? <Loading /> : <WebView style={styles.webview} source={{uri: url}} />}
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