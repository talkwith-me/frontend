import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { defaultStyles } from '@/constants/Styles';
import { Stack, useFocusEffect } from 'expo-router';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AnswerApi from '../api/AnswerApi';
import { QuestionWithAnswers } from '../model/Answer';
import { useIsFocused } from '@react-navigation/native';
import { BookContext } from '../_layout';

const talkwithus = () => {
  const {book} = useContext(BookContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [otherAnswers, setOtherAnswers] = useState<QuestionWithAnswers[]>();

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      AnswerApi.findOthers(book.id).then((result) => {
        setOtherAnswers(result.data);
        setIsLoading(false);
      })
    }, [isFocused])
  );

  const isOtherAnswersExist = () => {
    return (otherAnswers && otherAnswers?.length > 0);
  }

  const showOtherAnswers = () => {
    if (isOtherAnswersExist()) {
      return (otherAnswers!.map(otherAnswer => {
        return <QuestionCard 
          key={otherAnswer.question.id}
          question={otherAnswer.question} 
          forShare={true} 
          commentCount={otherAnswer.answers.length} 
        />
      }))
    } else {
      return (
        <View style={{alignItems: 'center', padding: 15, paddingTop: 150}}>
          <Text style={[defaultStyles.fontM, {textAlign: 'center'}]}>아직 작성한 답변이 없어요.{'\n'}오늘의 질문부터 작성해볼까요?</Text>
        </View>
      )
    }
  }

  return (
    <View>
      <Stack.Screen options={{
        header: () => <Header title={"우리의 대화"} />
      }} />
      {isLoading ? <></> : (
        <ScrollView scrollEnabled={isOtherAnswersExist() ? true : false} 
                    contentContainerStyle={defaultStyles.bodyContainer} overScrollMode='never'>
          <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20}}>
            <Text style={[defaultStyles.fontMBoldSecondary, {marginTop: 10}]}>내가 답변한 질문의{'\n'}다양한 생각을 만나보세요 ✨</Text>
          </View>
          <View style={{gap: 20, paddingBottom: 50}}>
            {showOtherAnswers()}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

export default talkwithus