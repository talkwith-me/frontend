import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'
import Colors from '@/constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';

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
      <View style={{flex: 1, backgroundColor: Colors.warning, borderRadius: 10}}/>
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
  return (
    <Link href={`(questions)/1` as any} asChild>
      <TouchableOpacity activeOpacity={0.6}>
          <View style={defaultStyles.card}>
              <Text style={[defaultStyles.fontS, {marginTop: 5}]}>나와의 대화 | DAY 0</Text>
              <Text style={[defaultStyles.fontMBold, {marginTop: 10}]}>당신의 올해 가장 큰 소망은 무엇인가요?</Text>
              <Text style={[defaultStyles.fontSBlack, {marginTop: 7.5}]}>하나를 뽑긴 어렵고, 올해 3가지 소망이... </Text>
          </View>
      </TouchableOpacity>
    </Link>
  );
}

export default talkwithme;