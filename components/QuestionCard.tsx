import { Question } from '@/app/model/Question';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const QuestionCard = (props: {question: Question, forShare: boolean, commentCount?: number}) => {
    const [linkFormat, setLinkFormat] = useState<string>('(questions)');
    const navigation = useNavigation();

    useEffect(() => {
        if (props.forShare) {
            setLinkFormat('(shares)');
        }
    }, [props.forShare]);

    const showComments = () => {
        return (
            <View style={{alignItems: 'flex-end', marginTop: 10}}>
                <View style={{flexDirection: 'row', gap: 3}}>
                    <Octicons name="comment" size={12} color={Colors.grey} />
                    <Text style={defaultStyles.fontS}>{props.commentCount}</Text>
                </View>
            </View>
        );
    }

    return (
        <View>
            <Link href={`${linkFormat}/${props.question.id}` as any} asChild>
                <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}>
                    <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화·DAY {props.question.dayCount}</Text>
                    <Text style={[defaultStyles.fontMBold, {marginTop: 15}]}>{props.question.contents}</Text>
                    {props.forShare && showComments()}
                </TouchableOpacity>
            </Link>
        </View>
    );
}

export default QuestionCard;