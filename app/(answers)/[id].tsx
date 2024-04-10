import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'

const allAnswers = () => {
  // qId
  const { id } = useLocalSearchParams<{id: string}>();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const answerWidth = Math.round(Dimensions.get('window').width) * 0.8;
  const answerHeight = Math.round(Dimensions.get('window').height) * 0.8;
  const offset = 12
  const gap = 12

  const maxQId = 3 // API 수정
  const initialContentOffset = { x: (answerWidth + gap) * (maxQId - Number(id)), y: 0 };

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightGrey}}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{padding: 20, flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 40}}>
              <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <Text style={[defaultStyles.fontL, {marginTop: 20}]}>나의 답변 ✍🏻</Text>
        <ScrollView
          horizontal
          overScrollMode='never'
          contentContainerStyle={{ gap: gap, padding: offset + gap/2, marginTop: 20 }}
          snapToInterval={answerWidth + gap}
          snapToAlignment="start"
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentOffset={initialContentOffset}
        >
          <PrevAnswers qId={3} width={answerWidth} height={answerHeight} />
          <PrevAnswers qId={2} width={answerWidth} height={answerHeight} />
          <PrevAnswers qId={1} width={answerWidth} height={answerHeight} />
        </ScrollView>
      </View>
    </View>
  )
}

const PrevAnswers = (props: {qId: number, width: number, height: number}) => {
  const [text, setText] = useState('');
  const answerHeight = Math.round(Dimensions.get('window').height) * 0.5;

  useEffect(() => {
    if (props.qId == 1) setText("행복함을 느끼는 순간을 알려주세요.\n사소한 것도 좋아요!");
    if (props.qId == 2) setText("열등감을 느끼는 순간이 있나요?\n무슨 이유로 그런 감정이 드나요?");
    if (props.qId == 3) setText("누가 시키지 않았는데도\n열심히 하는 것이 있다면 알려주세요 :)");
  }, [])

  return (
    <View style={{width: props.width, height: props.height}}>
      <Link href={`(questions)/1` as any} asChild>
        <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}> 
          <Text style={[defaultStyles.fontS, {marginTop: 15}]}>나와의 대화·DAY {props.qId}</Text>
          <Text style={[defaultStyles.fontMBold, {marginTop: 15}]}>{text}</Text>
          <Text style={[defaultStyles.fontM, {height: answerHeight, paddingVertical: 20}]}>무이무이{'\n'}무이무이{'\n'}무이무이{'\n'}무이무이{'\n'}무이무이{'\n'}무이무이{'\n'}무이무이{'\n'}</Text>
          <Text style={[defaultStyles.fontS, {position: 'absolute', bottom: 20, right: 20}]}>2024.04.07</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default allAnswers