import { View, Text, ScrollView, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header';
import { defaultStyles } from '@/constants/Styles';
import QuestionCard from '@/components/QuestionCard';

const talkwithus = () => {
  return (
    <View>
      <Stack.Screen options={{
        header: () => <Header title={"우리의 대화"} />
      }} />
      <ScrollView contentContainerStyle={defaultStyles.bodyContainer} overScrollMode='never'>
        <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20}}>
          <Text style={[defaultStyles.fontSBold, {marginTop: 10}]}>내가 답변한 질문의</Text>
          <Text style={[defaultStyles.fontSBold, {marginTop: 10}]}>다양한 생각을 만나보세요</Text>
        </View>
        <View style={{gap: 20, paddingBottom: 50}}>
          <QuestionCard qId={1} forShare={true} comments={12} />
          <QuestionCard qId={1} forShare={true} comments={10} />
          <QuestionCard qId={1} forShare={true} comments={9} />
          <QuestionCard qId={1} forShare={true} comments={7} />
          <QuestionCard qId={1} forShare={true} comments={6} />
          <QuestionCard qId={1} forShare={true} comments={19} />
        </View>
      </ScrollView>
    </View>
  )
}

export default talkwithus