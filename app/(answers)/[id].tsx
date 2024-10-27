import { View, Text, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native'
import React, {useState, useEffect, useCallback, useContext} from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'
import AnswerApi from '../api/AnswerApi';
import { Question } from '../model/Question';
import { QuestionWithAnswer } from '../model/Answer';
import { Answer } from '../model/Answer';
import { BookContext } from '../_layout';
import { DateUtil } from '../util/DateUtil';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

const allAnswers = () => {
  const { id: focusQId } = useLocalSearchParams<{id: string}>();
  const {book} = useContext(BookContext);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const pagePadding = 20
  const gap = 10;
  // pagePadding 양쪽, gap 양쪽을 뺀만큼 그리고, 스크롤을 이 answer 만큼
  const answerWidth = Math.round(Dimensions.get('window').width) - pagePadding * 2 - gap * 2;
  const answerHeight = Math.round(Dimensions.get('window').height) * (Platform.OS === 'ios' ? 0.65 : 0.7);

  const [prevAnswers, setPrevAnswers] = useState<QuestionWithAnswer[]>()
  const [maxQuestionId, setMaxQuestionId] = useState<number>(0);
  const initialContentOffset = { x: (answerWidth + gap) * (maxQuestionId - Number(focusQId)), y: 0 };

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      AnswerApi.findHistories(book.id).then((result) => {
        setPrevAnswers(result.data);
      });
    }, [isFocused])
  )

  useEffect(() => {
    if (prevAnswers && prevAnswers.length > 0) {
      const maxQuestionId = prevAnswers[0].question.id
      setMaxQuestionId(maxQuestionId);
    }
  }, [prevAnswers]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightGrey}}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{padding: pagePadding, flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 40}}>
              <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <Text style={[defaultStyles.fontL, {marginTop: 20}]}>나의 답변 ✍🏻</Text>
        <ScrollView
          horizontal
          overScrollMode='never'
          contentContainerStyle={{ marginTop: 20, gap: gap, padding: gap }}
          snapToInterval={answerWidth + gap}
          snapToAlignment="start"
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentOffset={initialContentOffset}
        >
          {prevAnswers && prevAnswers.map((prevAnswer) => {
            return <PrevAnswers key={prevAnswer.question.id} question={prevAnswer.question} answer={prevAnswer.answer!} width={answerWidth} height={answerHeight} />
          })}
        </ScrollView>
      </View>
    </View>
  )
}

const PrevAnswers = (props: {question: Question, answer: Answer, width: number, height: number}) => {
  const {book} = useContext(BookContext);
  const questionHeight = Math.round(Dimensions.get('window').height) * 0.1;
  const answerHeight = Math.round(Dimensions.get('window').height) * (Platform.OS === 'ios' ? 0.45 : 0.5);

  return (
    <View style={[defaultStyles.card, { width: props.width, height: props.height }]}>
      <Text style={[defaultStyles.fontS, { marginTop: 15, ㄹ }]}>{book.title}·DAY {props.question.dayCount}</Text>
      <Text style={[defaultStyles.fontMBold, { minHeight: questionHeight, marginTop: 15 }]}>
        {props.question.contents}
      </Text>
      <ScrollView 
        style={{ maxHeight: answerHeight, marginBottom: 35}} 
        bounces={false} 
        showsVerticalScrollIndicator={false}>
        <Text style={[defaultStyles.fontM]}>{props.answer.contents}</Text>
      </ScrollView>
      <View style={{flexDirection: 'row', alignItems: 'center', bottom: 5}}>
        <Text style={defaultStyles.fontS}>{DateUtil.convert(props.answer.modifiedAt)}</Text>
        <Link href={`(questions)/${props.question.id}`} asChild>
          <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
            <Feather name="edit" size={18} color={Colors.grey} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default allAnswers