import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'
import * as Haptics from 'expo-haptics';

const allAnswers = () => {
  // userId
  const { id } = useLocalSearchParams<{id: string}>();
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  
  const handleGoBack = () => {
    navigation.goBack();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

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
          ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} overScrollMode='never' 
          contentContainerStyle={{gap: 10, padding: 10, marginTop: 20}}>
          <PrevAnswers qId={3} />
          <PrevAnswers qId={2} />
          <PrevAnswers qId={1} />
        </ScrollView>
      </View>
    </View>
  )
}

const PrevAnswers = (props: {qId: number}) => {
  const [text, setText] = useState('');
  const { width } = Dimensions.get('window');

  useEffect(() => {
    if (props.qId == 1) setText("행복함을 느끼는 순간을 알려주세요.\n사소한 것도 좋아요!");
    if (props.qId == 2) setText("열등감을 느끼는 순간이 있나요?\n무슨 이유로 그런 감정이 드나요?");
    if (props.qId == 3) setText("누가 시키지 않았는데도\n열심히 하는 것이 있다면 알려주세요 :)");
  }, [])

  return (
    <Link href={`(questions)/1` as any} asChild>
      <TouchableOpacity activeOpacity={0.6}>
        <View style={[defaultStyles.card, {flex: 0.85, maxWidth: width - 50}]}>
          <Text style={[defaultStyles.fontS, {marginTop: 15}]}>나와의 대화·DAY {props.qId}</Text>
          <Text style={[defaultStyles.fontMBold, {marginTop: 15}]}>{text}</Text>
          <Text style={[defaultStyles.fontM, {marginTop: 30}]}>작성된 이전 답변은 이렇게 표시됩니다.{'\n'}길게 사람들이 과연 쓸까요?</Text>
          <Text style={[defaultStyles.fontS, {position: 'absolute', bottom: 20, right: 20}]}>2024.04.07</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default allAnswers