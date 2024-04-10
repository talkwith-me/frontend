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

const talkwithme = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{
        header: () => <Header title={"나와의 대화"} />
      }} />
      <View style={[defaultStyles.bodyContainer, {gap: 30, flex: 1}]}>
        <Banner />
        <TodayQuestion />
        <PrevQuestions />
        {/* <CustomModal 
          visible={modalVisible} 
          onRequestClose={() => setModalVisible(false)} 
          onConfirm={() => setModalVisible(false)} 
          onCancel={() => setModalVisible(false)} 
          title='친구를 초대해 주세요 🙌🏻'
          message='Day 10 질문을 만나기 위해서, 친구를 초대해 주세요 :) 나와의 대화를 소개시켜 주세요!'
        /> */}
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
  return (
    <View style={{flex: 11, justifyContent: 'center'}}>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>오늘의 질문 🎁</Text>
      </View>
      <QuestionCard qId={4} forShare={false} />
    </View>
  );
}

const PrevQuestions = () => {

  const showAllPrevAnswers = () => {
    router.push('(answers)/0');
  }

  return (
    <View style={{flex: 14, justifyContent: 'center'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>나의 답변 ✍🏻</Text>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 7}} onPress={showAllPrevAnswers} activeOpacity={0.6}>
          <Text style={[defaultStyles.fontS, {textAlign: 'center'}]}>전체보기</Text>
          <FontAwesome style={[defaultStyles.fontS, {textAlign: 'center'}]} name="angle-right" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' contentContainerStyle={{gap: 10, padding: 5}}>
        <PrevQuestion qId={3} />
        <PrevQuestion qId={2} />
        <PrevQuestion qId={1} />
        <ViewAllCard text={'답변\n전체보기'} onPress={showAllPrevAnswers} />
      </ScrollView>
    </View>
  );
}

const PrevQuestion = (props: {qId: number}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (props.qId == 1) setText("행복함을 느끼는 순간을 알려주세요.\n사소한 것도 좋아요!");
    if (props.qId == 2) setText("열등감을 느끼는 순간이 있나요?\n무슨 이유로 그런 감정이 드나요?");
    if (props.qId == 3) setText("누가 시키지 않았는데도\n열심히 하는 것이 있다면 알려주세요 :)");
  }, [])

  return text == '' ? <></> : (
      <View>
        <Link href={`(answers)/${props.qId}` as any} asChild>
          <TouchableOpacity style={defaultStyles.card} activeOpacity={0.6}>
            <Text style={[defaultStyles.fontS, {marginTop: 5}]}>나와의 대화·DAY {props.qId}</Text>
            <Text style={[defaultStyles.fontMBold, {marginTop: 10}]}>{text}</Text>
            <Text style={[defaultStyles.fontSBlack, {marginTop: 7.5}]}>작성된 이전 답변은 이렇게 표시되어요... </Text>
          </TouchableOpacity>
        </Link>
      </View>
  );
}

export default talkwithme;