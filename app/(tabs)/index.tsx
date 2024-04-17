import CustomModal from '@/components/CustomModal';
import Header from '@/components/Header';
import QuestionCard from '@/components/QuestionCard';
import ViewAllCard from '@/components/ViewAllCard';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Link, Stack, router, useRouter } from 'expo-router';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Dimensions, Image, Linking, ScrollView, Text, TouchableOpacity, View, Share } from 'react-native';
import Swiper from 'react-native-swiper';
import { BookContext, UserContext } from '../_layout';
import AnswerApi from '../api/AnswerApi';
import QuestionApi from '../api/QuestionApi';
import UserApi from '../api/UserApi';
import { Answer, QuestionWithAnswer } from '../model/Answer';
import { Question } from '../model/Question';
import AuthUtil from '../util/AuthUtil';
import CacheUtil from '../util/CacheUtil';

const talkwithme = () => {
  const {user, setUser} = useContext(UserContext);
  const {book, setBook} = useContext(BookContext);

  const [isLoading, setIsLoading] = useState(true);
  const [todayQuestion, setTodayQuestion] = useState<Question>();

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isLoading) {
        findUserInfo();
      } else {
        getTodayQuestion(book.id);
      }
    }, [isFocused])
  )

  const findUserInfo = () => {
    UserApi.findMyself().then((result) => {
      if (result.status == 200) {
        setUser(result.data.user);
        setBook(result.data.book);
        getTodayQuestion(Number(result.data.book.id));
        refreshUser();
      } else {
        router.replace('/(user)/intro');
        setIsLoading(false);
      }
    })
  }

  const getTodayQuestion = (bookId: number) => {
    QuestionApi.findTodayQuestion(Number(bookId)).then((result) => {
      setTodayQuestion(result.data);
      setIsLoading(false);
    })
  }

  const refreshUser = () => {
    UserApi.refresh().then((result) => {
      if (result.status == 200) {
        AuthUtil.saveToken(result.data.accessToken);
      }
    })
  }

  return isLoading ? <></> : (
    <View style={{flex: 1}}>
      <Stack.Screen options={{
        header: () => <Header title={"나와의 대화"} />
      }} />
      <Banners todayQuestion={todayQuestion!} />
      <View style={[defaultStyles.bodyContainer, {gap: 30, flex: 1}]}>
        <TodayQuestion todayQuestion={todayQuestion!} />
        <PrevQuestions />
        <ShowModalByUser todayQuestion={todayQuestion!} />
      </View>
    </View>
  )
}

const Banners = (props: {todayQuestion: Question}) => {
  const router = useRouter();
  const bannerWidth = (Dimensions.get('window').width);

  const bannerPagination = (index: number, total: number, context: any) => {
    return (
      <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <View style={[{ borderRadius: 20, padding: 10, backgroundColor: Colors.grey }]}>
          <Text style={[defaultStyles.fontSWhite, {fontSize: 10}]}>{index + 1}/{total}</Text>
        </View>
      </View>
    )
  }
  
  return (
    <View style={{ width: bannerWidth, height: bannerWidth / 4 , justifyContent: 'center', backgroundColor: Colors.lightGrey}}>
      <Swiper renderPagination={bannerPagination} autoplay={true} autoplayTimeout={5} style={{borderRadius: 10}}>
        <TouchableOpacity 
          activeOpacity={0.9}
          style={{flex: 1, justifyContent: 'center'}} 
          onPress={() => router.push(`/(questions)/${props.todayQuestion.id}`)}>
          <Image 
            source={{ uri: 'https://raw.githubusercontent.com/talkwith-me/image/main/banner-open.png' }}
            style={{ flex: 1, width: bannerWidth}} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          activeOpacity={0.9}
          style={{flex: 1, justifyContent: 'center'}} 
          onPress={() => Linking.openURL("https://blog.naver.com/talkwith-me/223416605254")}>
          <Image 
            source={{ uri: 'https://raw.githubusercontent.com/talkwith-me/image/main/banner-mission.png' }}
            style={{ flex: 1, width: bannerWidth}} 
          />
        </TouchableOpacity>
      </Swiper>
    </View>
  );
}

const TodayQuestion = (props: {todayQuestion: Question}) => {
  return (
    <View style={{flex: 5, justifyContent: 'center'}}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>오늘의 질문 🎁</Text>
      </View>
      <QuestionCard question={props.todayQuestion} forShare={false} />
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
        <ScrollView key={prevQuestions ? prevQuestions.length : 0} 
                    horizontal showsHorizontalScrollIndicator={false} 
                    overScrollMode='never' 
                    contentContainerStyle={{gap: 10, padding: 5}}>
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

const ShowModalByUser = (props: {todayQuestion: Question}) => {
  const {book} = useContext(BookContext);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const [modalCloseAction, setModalCloseAction] = useState<() => void>();

  useEffect(() => {
    if (book.id === 1) {
      if (props.todayQuestion.dayCount === 10) {
        showWelcomeMessage1();
      } else if (props.todayQuestion.dayCount === 0) {
        showFriendIntroduce();
      } else if (props.todayQuestion.dayCount === 30) {
        showComplete();
      } else {
        setShowModal(false);
      }
    }
  }, []);

  const closeModal = function() {
    modalCloseAction!();
    setShowModal(false);
  }

  const showWelcomeMessage1 = () => {
    setTitle("환영합니다 🙌🏻");
    setMessage("나와의 대화는\nDAY 0 부터 DAY 30 까지 진행됩니다.\n\n매일 밤 10시,\n오늘의 질문을 보내드리니\n알림을 꼭 켜주세요 🔔\n\n나와의 대화를 통해\n나 자신을 더 알아가보세요 :)")
    setModalCloseAction(() => confirmPush);
    setShowModal(true);
  }

  const confirmPush = function() {
    console.log('push!');
  }

  const showFriendIntroduce = () => {
    setTitle("친구에게 소개해주세요 🎟️");
    setMessage("나와의 대화를 통해\n나 자신과 더 친해지고 계신가요?\n\nDay 10 질문을 만나기 전에,\n나와의 대화를 친구에게 알려주세요 :)")
    setModalCloseAction(() => onShare);
    setShowModal(true);
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: '나와의 대화 | 나와의 대화로 찾아가는 나만의 가치',
        message: 'https://talkwith-me.github.io/'
      });
      console.log(result.action);
    } catch (error: any) {
      return;
    }
  };

  const showComplete = () => {
    setTitle("벌써 DAY 30! 🎉");
    setMessage("여기까지 오신 당신은,\n정말 뭐든지 해낼거에요!\n\n마지막 질문을 마무리하고,\n나와의 대화를 책으로 만나보세요!\n\n마이페이지 > 나와의 대화 출판하기")
    setModalCloseAction(() => () => setShowModal(false));
    setShowModal(true);
  }
  
  return (
    <CustomModal 
      visible={showModal} 
      onRequestClose={closeModal}
      onConfirm={closeModal}
      title={title}
      message={message}
      smallButton={true}
    />
  );
}

export default talkwithme;