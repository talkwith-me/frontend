import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'
import Colors from '@/constants/Colors';

const talkwithme = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{
        header: () => <Header title={"나와의 대화"} />
      }} />
      <View style={[defaultStyles.bodyContainer, {gap: 30, flex: 1}]}>
        <Banner />
        <TodayQuestion />
        <PrevQuestions />
      </View>
    </View>
  )
}

const Banner = () => {
  return (
    <View style={{marginTop: 10, flex: 1.5, justifyContent: 'center'}} >
      <View style={{flex: 1.5, backgroundColor: Colors.secondary, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[defaultStyles.fontMBold, {color: Colors.white}]}>배너 영역</Text>
      </View>
    </View>
  )
}

const TodayQuestion = () => {
  return (
    <View style={{flex: 5, justifyContent: 'center'}}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>오늘의 질문 🎁</Text>
      </View>
      <QuestionCard qId={1} forShare={false} />
    </View>
  );
}

const PrevQuestions = () => {
  return (
    <View style={{flex: 7, justifyContent: 'center'}}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 15}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>나의 답변 ✍🏻</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{gap: 10, padding: 5}}>
        <PrevQuestion />
        <PrevQuestion />
        <PrevQuestion />
      </ScrollView>
    </View>
  );
}

const PrevQuestion = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    if (randomNumber == 1) setText('당신이 행복함을 느끼는 순간을 알려주세요.사소한 것도 좋아요! (전 짜장면 먹을 때 행복합니다)');
    if (randomNumber == 2) setText("당신이 열등감을 느끼는 순간은 언제인가요?{'\n'}무슨 이유로 그런 감정이 드나요?");
    if (randomNumber == 3) setText("누가 시키지 않았는데도 열심히 하는 것이{'\n'}있다면 알려주세요 :)");
    if (randomNumber == 4) setText("돈을 얼마나 벌면 충분할 것 같나요?{'\n'}그 돈을 어디에 쓰고 싶나요?");
    else setText('');
  }, [])

  return (
    <Link href={`(questions)/1` as any} asChild>
      <TouchableOpacity activeOpacity={0.6}>
          <View style={defaultStyles.card}>
              <Text style={[defaultStyles.fontS, {marginTop: 5}]}>나와의 대화·DAY 0</Text>
              <Text style={[defaultStyles.fontMBold, {marginTop: 10}]}>어린 시절 꿈을 알려주세요.{'\n'}어떤 이유로 그 꿈을 꾸었나요?</Text>
              <Text style={[defaultStyles.fontSBlack, {marginTop: 7.5}]}>작성된 이전 답변은 이렇게 표시되어요... </Text>
          </View>
      </TouchableOpacity>
    </Link>
  );
}

export default talkwithme;