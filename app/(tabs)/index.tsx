import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import Header from '@/components/Header';
import { defaultStyles } from '@/constants/Styles';

const talkwithme = () => {
  return (
    <View>
      <Stack.Screen options={{
        header: () => <Header title={"나와의 대화"} />
      }} />
      <TodayQuestion />
    </View>
  )
}

const TodayQuestion = () => {
  const questionId = 1

  return (
    <Link href={`(questions)/${questionId}` as any} asChild>
      <TouchableOpacity activeOpacity={0.6}>
        <View style={defaultStyles.bodyContainer}>
          <View style={defaultStyles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={[defaultStyles.fontL, {marginTop: 10, textAlign: 'center'}]}>오늘의 질문 🎁</Text>
            </View>
            <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화 | DAY 1</Text>
            <Text style={[defaultStyles.fontM, {marginTop: 20}]}>돈을 얼마나 벌고 싶나요?{'\n'}그 돈을 어떻게 쓰고 싶나요?</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default talkwithme;