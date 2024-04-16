import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { QuestionWithUserAnswers, UserAnswer } from '../model/Answer';
import AnswerApi from '../api/AnswerApi';
import { DateUtil } from '../util/DateUtil';

const Share = () => {
    const { id: qId } = useLocalSearchParams<{id: string}>();
    const navigation = useNavigation();

    const [otherAnswers, setOtherAnswers] = useState<QuestionWithUserAnswers>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        AnswerApi.findOtherAnswersByQuestionId(Number(qId)).then((result) => {
            setOtherAnswers(result.data);
            setIsLoading(false);
        })
    }, [])

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 60}}>
                    <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{marginBottom: 50}}>
                {!isLoading && otherAnswers && otherAnswers?.question && (
                    <View style={{padding: 20, paddingTop: 0}}>
                        <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화·DAY {otherAnswers.question.dayCount}</Text>
                        <Text style={[defaultStyles.fontMBold, {marginTop: 20}]}>{otherAnswers.question.contents}</Text>
                        <View style={{alignItems: 'flex-end', marginTop: 10}}>
                            <View style={{flexDirection: 'row', gap: 3}}>
                                <Octicons name="comment" size={14} color={Colors.grey} />
                                <Text style={defaultStyles.fontS}>{otherAnswers.userAnswers.length}</Text>
                            </View>
                        </View>
                    </View>
                )}
                <View style={{height: 7, backgroundColor: Colors.lightGrey}}/>
                {!isLoading && otherAnswers && otherAnswers.userAnswers && otherAnswers.userAnswers.map((userAnswer, idx) =>
                    <Comment key={idx} userAnswer={userAnswer} />
                )}
            </ScrollView>
        </View>
    )
}

const Comment = (props: {userAnswer: UserAnswer}) => {
    return (
        <View>
            <View style={defaultStyles.commentElement}>
                <Text style={defaultStyles.fontSPrimary}>{props.userAnswer.nickname}님</Text>
                <Text style={[defaultStyles.fontM, {marginTop: 10}]}>{props.userAnswer.contents}</Text>
                <Text style={[defaultStyles.fontS, {marginTop: 15}]}>{DateUtil.convert(props.userAnswer.modifiedAt)}</Text>
            </View>
            <View style={{height: 1, backgroundColor: Colors.lightGrey}}/>
        </View>
    );
}

export default Share;