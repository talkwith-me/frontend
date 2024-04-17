import Loading from '@/components/Loading';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height * 1.2;

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

  const navigation = useNavigation();

  useEffect(() => {
    const url = urlMap[id];
    setUrl(url || '');
    const title = urlTitleMap[id];
    setTitle(title || '');
    setTimeout(() => setIsLoading(false), 1000);
  }, [id]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{padding: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white, width: windowWidth}}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={defaultStyles.fontL}>{title}</Text>
      </View>
      {/* <Stack.Screen options={{ headerShown: true, title: title, headerBackTitleVisible: false, contentStyle: {height: 10} }} /> */}
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