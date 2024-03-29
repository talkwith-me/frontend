import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import { Octicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const QuestionCard = (props: {qId: number, forShare: boolean, comments?: number}) => {

    const [linkFormat, setLinkFormat] = useState<string>('(questions)');

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
                    <Text style={defaultStyles.fontS}>{props.comments}</Text>
                </View>
            </View>
        );
    }

    return (
        <Link href={`${linkFormat}/${props.qId}` as any} asChild>
            <TouchableOpacity activeOpacity={0.6}>
                <View style={defaultStyles.card}>
                    <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화 | DAY 1</Text>
                    <Text style={[defaultStyles.fontMBold, {marginTop: 20}]}>테스트 질문{'\n'}테스트 질문</Text>
                    {props.forShare && showComments()}
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default QuestionCard;