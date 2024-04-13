import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import CustomModal from '@/components/CustomModal';
import ViewAllCard from '@/components/ViewAllCard';
import { router } from 'expo-router';
import { Question } from '../model/Question';
import { QuestionWithAnswer } from '../model/Answer';
import QuestionApi from '../api/QuestionApi';
import AnswerApi from '../api/AnswerApi';
import { Answer } from '../model/Answer';

const talkwithme = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{
        header: () => <Header title={"나와의 대화"} />
      }} />
      <View style={[defaultStyles.bodyContainer, {gap: 30, flex: 1}]}>
        <Banner />
        <TodayQuestion />
        <PrevQuestions />
        {showModal && (
          <CustomModal 
            visible={showModal} 
            onRequestClose={() => setShowModal(false)} 
            onConfirm={() => setShowModal(false)} 
            onCancel={() => setShowModal(false)} 
            title='친구를 초대해 주세요 🙌🏻'
            message='Day 10 질문을 만나기 위해서, 친구를 초대해 주세요 :) 나와의 대화를 소개시켜 주세요!'
          />
        )}
      </View>
    </View>
  )
}

const Banner = () => {
  return (
    <View style={{flex: 4, justifyContent: 'center'}} >
      <View style={{flex: 1, backgroundColor: Colors.secondary, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[defaultStyles.fontMBold, {color: Colors.white}]}>배너 영역</Text>
      </View>
    </View>
  )
}

const TodayQuestion = () => {
  const [question, setQuestion] = useState<Question>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    QuestionApi.findTodayQuestion(1).then((result) => {
      setQuestion(result.data);
      setIsLoading(false);
    })
  }, [])

  return (
    <View style={{flex: 11, justifyContent: 'center'}}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>오늘의 질문 🎁</Text>
      </View>
      {isLoading ? <></> : (
        <QuestionCard question={question!} forShare={false} />
      )}
    </View>
  );
}

const PrevQuestions = () => {
  const [prevQuestions, setPrevQuestions] = useState<QuestionWithAnswer[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    AnswerApi.findHistories(1).then((result) => {
      setPrevQuestions(result.data);
      setIsLoading(false);  
    })
  }, []);

  const showAllPrevAnswers = () => {
    router.push('(answers)/0');
  }

  const isPrevPresent = () => {
    return prevQuestions && prevQuestions.length > 0;
  }

  const showPrevQnA = () => {
    if (isPrevPresent()) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{gap: 10, padding: 5}}>
          {prevQuestions!.slice(0, 3).map((prevQuestion) => (
            <PrevQuestion key={prevQuestion.question.id} question={prevQuestion.question} answer={prevQuestion.answer!} />
          ))}
          <ViewAllCard text={'답변\n전체보기'} onPress={showAllPrevAnswers} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{alignItems: 'center', padding: 15}}>
          <Text style={[defaultStyles.fontM, {textAlign: 'center'}]}>아직 작성한 답변이 없어요.{'\n'}오늘의 질문부터 작성해볼까요?</Text>
        </ScrollView>
      )
    }
  };
  
  return (
    <View style={{flex: 14, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>나의 답변 ✍🏻</Text>
        {!isLoading && isPrevPresent() && (
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 7}} onPress={showAllPrevAnswers} activeOpacity={0.6}>
            <Text style={[defaultStyles.fontS, {textAlign: 'center'}]}>전체보기</Text>
            <FontAwesome style={[defaultStyles.fontS, {textAlign: 'center'}]} name="angle-right" />
          </TouchableOpacity>
        )}
      </View>
      {!isLoading && showPrevQnA()}
    </View>
  );
}

const PrevQuestion = (props: {question: Question, answer: Answer}) => {

  const shortenAnswer = (answer: string) => {
    const lines = answer.split('\n');
    const firstLine = lines[0]
    if (lines.length > 1) {
      return firstLine + '...';
    } else {
      return (firstLine.length > 30) ? firstLine + '...' : firstLine;
    }
  }

  return (
      <View>
        <Link href={`(answers)/${props.question.id}` as any} asChild>
          <TouchableOpacity style={defaultStyles.card} activeOpacity={0.6}>
            <Text style={[defaultStyles.fontS, {marginTop: 5}]}>나와의 대화·DAY {props.question.dayCount}</Text>
            <Text style={[defaultStyles.fontMBold, {marginTop: 10}]}>{props.question.contents}</Text>
            <Text style={[defaultStyles.fontSBlack, {marginTop: 7.5}]}>{shortenAnswer(props.answer.contents)}</Text>
          </TouchableOpacity>
        </Link>
      </View>
  );
}

export default talkwithme;