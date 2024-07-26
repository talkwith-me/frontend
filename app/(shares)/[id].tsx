import React, { useState, useEffect, useContext } from 'react';
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
import { Entypo } from '@expo/vector-icons';
import CustomModal from '@/components/CustomModal';
import { BookContext, UserContext } from '../_layout';
import ComplainApi from '../api/ComplainApi';
import BlockApi from '../api/BlockApi';

const Share = () => {
    const {book} = useContext(BookContext);
    const { id: qId } = useLocalSearchParams<{id: string}>();
    const navigation = useNavigation();

    const [otherAnswers, setOtherAnswers] = useState<QuestionWithUserAnswers>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showComplain, setShowComplain] = useState<boolean>(false);
    const [complainAnswer, setComplainAnswer] = useState<UserAnswer | undefined>();

    useEffect(() => {
        findOtherAnswers()
    }, [])

    const findOtherAnswers = () => {
        AnswerApi.findOtherAnswersByQuestionId(Number(qId)).then((result) => {
            setOtherAnswers(result.data);
            setIsLoading(false);
        })
    }

    const handleGoBack = () => {
        navigation.goBack();
    };

    const complain = () => {
        if (complainAnswer) {
            ComplainApi.saveAnswerComplain(complainAnswer.answerId);
        }
    }

    const block = () => {
        if (complainAnswer) {
            BlockApi.blockUser(complainAnswer.userId).then(() => {
                findOtherAnswers()
            });
        }
    }

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
                        <Text style={[defaultStyles.fontS, {marginTop: 10}]}>{book.title}·DAY {otherAnswers.question.dayCount}</Text>
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
                    <Comment key={idx} 
                        userAnswer={userAnswer} 
                        showComplain={showComplain} 
                        setShowComplain={setShowComplain} 
                        setComplainAnswer={setComplainAnswer} 
                    />
                )}
            </ScrollView>
            <Complain 
                showComplain={showComplain}
                setShowComplain={setShowComplain} 
                complainAnswer={complainAnswer} 
                complain={complain}
                block={block}
            />
        </View>
    )
}

const Complain = (
    props: {
        showComplain: boolean, 
        setShowComplain: React.Dispatch<React.SetStateAction<boolean>>, 
        complainAnswer: UserAnswer | undefined,
        complain: () => void;
        block: () => void;
    }
) => {

    const {user} = useContext(UserContext);
    const [showCannotComplain, setShowCannotComplain] = useState<boolean>(false);
    const [showComplainConfirm, setShowComplainConfirm] = useState<boolean>(false);
    const [showComplainComplete, setShowComplainComplete] = useState<boolean>(false);

    const [showCannotBlock, setShowCannotBlock] = useState<boolean>(false);
    const [showBlockConfirm, setShowBlockConfirm] = useState<boolean>(false);

    const showUserComplainConfirm = () => {
        if (user.id === props.complainAnswer?.userId) {
            setShowCannotComplain(true);
        } else {
            setShowComplainConfirm(true);
        }
    }

    const closeCannots = () => {
        setShowCannotBlock(false);
        setShowCannotComplain(false);
        props.setShowComplain(false);
    }

    const confirmComplain = () => {
        setShowComplainConfirm(false);
        setShowComplainComplete(true);
    }

    const completeComplain = () => {
        setShowComplainComplete(false);
        props.setShowComplain(false);
        props.complain();
    }

    const showUserBlockConfirm = () => {
        if (user.id === props.complainAnswer?.userId) {
            setShowCannotBlock(true);
        } else {
            setShowBlockConfirm(true);
        }
    }
    
    const confirmBlock = () => {
        setShowBlockConfirm(false);
        props.setShowComplain(false);
        props.block();
    }

    return (
        props.showComplain ? 
        (
            <>
                <TouchableOpacity style={defaultStyles.bottomSheetBackground} 
                    activeOpacity={1} onPress={() => props.setShowComplain(false)} 
                />
                <View style={defaultStyles.bottomSheetModal}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => showUserBlockConfirm()}>
                        <Text style={[defaultStyles.fontM, {textAlign: 'center', paddingTop: 5, paddingBottom: 15}]}>차단하기</Text>
                    </TouchableOpacity>
                    <View style={{borderWidth: 0.5, borderColor: Colors.lightGray}}/>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => showUserComplainConfirm()}>
                        <Text style={[defaultStyles.fontM, {textAlign: 'center', paddingTop: 15, paddingBottom: 15}]}>신고하기</Text>
                    </TouchableOpacity>
                </View>
                {showCannotComplain && (
                    <CustomModal 
                        visible={showCannotComplain}
                        onRequestClose={() => closeCannots()}
                        onConfirm={() => closeCannots()}
                        message={`본인의 글은 신고할 수 없습니다.`}
                        smallButton={true}
                    />
                )}
                {showComplainConfirm && (
                    <CustomModal 
                        visible={showComplainConfirm}
                        onRequestClose={() => setShowComplainConfirm(false)}
                        onCancel={() => setShowComplainConfirm(false)}
                        onConfirm={() => confirmComplain()}
                        message={`해당 답변을 부적절한 답변으로\n신고하시겠습니까?`}
                        smallButton={true}
                    />
                )}
                {showComplainComplete && (
                    <CustomModal 
                        visible={showComplainComplete}
                        onRequestClose={() => completeComplain()}
                        onConfirm={() => completeComplain()}
                        message={`신고가 접수되었습니다.\n\n최대 24시간 이내로 검토하겠습니다.`}
                        smallButton={true}
                    />
                )}
                {showCannotBlock && (
                    <CustomModal 
                        visible={showCannotBlock}
                        onRequestClose={() => closeCannots()}
                        onConfirm={() => closeCannots()}
                        message={`본인의 계정은 차단할 수 없습니다.`}
                        smallButton={true}
                    />
                )}
                {showBlockConfirm && (
                    <CustomModal 
                        visible={showBlockConfirm}
                        onRequestClose={() => setShowBlockConfirm(false)}
                        onCancel={() => setShowBlockConfirm(false)}
                        onConfirm={() => confirmBlock()}
                        message={`해당 회원을 차단할까요?\n차단된 회원의 답변은 앞으로 보이지 않습니다.`}
                        smallButton={true}
                    />
                )}
            </>
        ) : 
        (<></>)
    );
}

const Comment = (
    props: {
        userAnswer: UserAnswer, 
        showComplain: boolean, 
        setShowComplain: React.Dispatch<React.SetStateAction<boolean>>,
        setComplainAnswer: React.Dispatch<React.SetStateAction<UserAnswer | undefined>>
    }
) => {

    const complainAnswer = () => {
        props.setComplainAnswer(props.userAnswer);
        props.setShowComplain(true);
    }

    return (
        <View>
            <View style={defaultStyles.commentElement}>
                <Text style={defaultStyles.fontSPrimary}>{props.userAnswer.nickname}님</Text>
                <Text style={[defaultStyles.fontM, {marginTop: 10}]}>{props.userAnswer.contents}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={defaultStyles.fontS}>{DateUtil.convert(props.userAnswer.modifiedAt)}</Text>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => complainAnswer()}>
                        <Entypo name="dots-three-horizontal" size={14} color={Colors.grey} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height: 1, backgroundColor: Colors.lightGrey}}/>
        </View>
    );
}

export default Share;