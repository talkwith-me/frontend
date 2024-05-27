import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
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

const allAnswers = () => {
  const { id: focusQId } = useLocalSearchParams<{id: string}>();
  const {book} = useContext(BookContext);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const answerWidth = Math.round(Dimensions.get('window').width) * 0.8;
  const answerHeight = Math.round(Dimensions.get('window').height) * 0.8;
  const offset = 12
  const gap = 12

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
      <View style={{padding: 20, flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 40}}>
              <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <Text style={[defaultStyles.fontL, {marginTop: 20}]}>나의 답변 ✍🏻</Text>
        <ScrollView
          horizontal
          overScrollMode='never'
          contentContainerStyle={{ gap: gap, padding: offset + gap/2, marginTop: 20 }}
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
  const questionHeight = Math.round(Dimensions.get('window').height) * 0.1;
  const answerHeight = Math.round(Dimensions.get('window').height) * (Platform.OS === 'ios' ? 0.45 : 0.5);

  return (
    <View style={{width: props.width, height: props.height}}>
      <Link href={`(questions)/${props.question.id}` as any} asChild>
        <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}> 
          <Text style={[defaultStyles.fontS, {marginTop: 15}]}>나와의 대화·DAY {props.question.dayCount}</Text>
          <Text style={[defaultStyles.fontMBold, {minHeight: questionHeight, marginTop: 15}]}>{props.question.contents.replace(/\n/g, ' ')}</Text>
          <Text style={[defaultStyles.fontM, {height: answerHeight, paddingVertical: 20}]}>{props.answer.contents}</Text>
          <Text style={[defaultStyles.fontS, {position: 'absolute', bottom: 20, right: 20}]}>{DateUtil.convert(props.answer.modifiedAt)}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default allAnswers