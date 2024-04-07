import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import { Octicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const QuestionCard = (props: {qId: number, forShare: boolean, comments?: number}) => {
    const [text, setText] = useState('');
    const [linkFormat, setLinkFormat] = useState<string>('(questions)');

    useEffect(() => {
        if (props.qId == 1) setText("행복함을 느끼는 순간을 알려주세요.\n사소한 것도 좋아요!");
        if (props.qId == 2) setText("열등감을 느끼는 순간이 있나요?\n무슨 이유로 그런 감정이 드나요?");
        if (props.qId == 3) setText("누가 시키지 않았는데도\n열심히 하는 것이 있다면 알려주세요 :)");
        else setText("어린 시절 꿈을 알려주세요.\n어떤 이유로 그 꿈을 꾸었나요?");
      }, [])

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
                    <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화·DAY {props.qId}</Text>
                    <Text style={[defaultStyles.fontMBold, {marginTop: 15}]}>{text}</Text>
                    {props.forShare && showComments()}
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default QuestionCard;