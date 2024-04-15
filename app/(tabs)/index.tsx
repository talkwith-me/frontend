import CustomModal from '@/components/CustomModal';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import ViewAllCard from '@/components/ViewAllCard';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Link, Stack, router } from 'expo-router';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Dimensions, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { BookContext, UserContext } from '../_layout';
import AnswerApi from '../api/AnswerApi';
import QuestionApi from '../api/QuestionApi';
import UserApi from '../api/UserApi';
import { Answer, QuestionWithAnswer } from '../model/Answer';
import { Question } from '../model/Question';

const talkwithme = () => {
  const [showModal, setShowModal] = useState(false);

  const {user, setUser} = useContext(UserContext);
  const {book, setBook} = useContext(BookContext);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        findUserInfo();
      }
    }, [isFocused])
  )

  const findUserInfo = () => {
    UserApi.findMyself().then((result) => {
      if (result.status == 200) {
        setUser(result.data.user);
        setBook(result.data.book);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        router.replace('/(user)/intro');
      }
    })
  }

  return isLoading ? <></> : (
    <View style={{flex: 1}}>
      <Stack.Screen options={{
        header: () => <Header title={"나와의 대화"} />
      }} />
      <Banners />
      <View style={[defaultStyles.bodyContainer, {gap: 30, flex: 1}]}>
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

const Banners = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bannerWidth = (Dimensions.get('window').width);

  useEffect(() => {  }, [])

  const bannerPagination = (index: number, total: number, context: any) => {
    return (
      <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <View style={[{ borderRadius: 20, padding: 10, backgroundColor: Colors.primary }]}>
          <Text style={[defaultStyles.fontSWhite, {fontSize: 10}]}>{index + 1}/{total}</Text>
        </View>
      </View>
    )
  }
  
  return (
    <View style={{ width: bannerWidth, height: bannerWidth / 4 , justifyContent: 'center', backgroundColor: isLoading ? Colors.grey : Colors.lightGrey}}>
      {isLoading ? (<></>) : (
        <Swiper renderPagination={bannerPagination} autoplay={true} autoplayTimeout={5} style={{borderRadius: 10}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image 
              source={{ uri: 'https://raw.githubusercontent.com/talkwith-me/image/main/banner-open.png' }}
              style={{ flex: 1, width: bannerWidth}} 
            />
          </View>
          <TouchableOpacity 
            activeOpacity={0.7}
            style={{flex: 1, justifyContent: 'center'}} 
            onPress={() => Linking.openURL("https://blog.naver.com/talkwith-me/223416605254")}>
            <Image 
              source={{ uri: 'https://raw.githubusercontent.com/talkwith-me/image/main/banner-mission.png' }}
              style={{ flex: 1, width: bannerWidth}} 
            />
          </TouchableOpacity>
        </Swiper>
      )}
    </View>
  );
}

const TodayQuestion = () => {
  const {book} = useContext(BookContext)
  const [question, setQuestion] = useState<Question>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      QuestionApi.findTodayQuestion(book.id).then((result) => {
        setQuestion(result.data);
        setIsLoading(false);
      })
    }, [isFocused])
  );

  return (
    <View style={{flex: 5, justifyContent: 'center'}}>
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
  const {book} = useContext(BookContext);

  const [prevQuestions, setPrevQuestions] = useState<QuestionWithAnswer[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      AnswerApi.findHistories(book.id).then((result) => {
        setPrevQuestions(result.data);
        setIsLoading(false);  
      })
    }, [isFocused])
  );
    
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
    <View style={{flex: 6, justifyContent: 'center'}}>
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