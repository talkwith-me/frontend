import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Dimensions, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { QuestionWithAnswer } from '../model/Answer';
import QuestionApi from '../api/QuestionApi';
import { AnswerForm } from '../model/Answer';
import AnswerApi from '../api/AnswerApi';
import CustomModal from '@/components/CustomModal';
import { BookContext } from '../_layout';

const Question = () => {
    const {book} = useContext(BookContext);
    // questionId
    const { id: qId } = useLocalSearchParams<{id: string}>();
    const navigation = useNavigation();

    // 키보드 관련
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardOptionHeight, setKeyboardOptionHeight] = useState(Platform.OS === 'android' ? 0 : 20);
    const [showKeyboardHideIcon, setShowKeyboardHideIcon] = useState(false);

    const [text, setText] = useState('');
    const [isShare, setIsShare] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [qna, setQna] = useState<QuestionWithAnswer>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        QuestionApi.findById(Number(qId), book.id).then((result) => {
            setQna(result.data);
            setIsLoading(false);
        })
    }, [])

    useEffect(() => {
        if (qna && qna.answer) {
            setText(qna.answer.contents);
            setIsShare(qna.answer.share);
        }
    }, [qna]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            const changedHeight = Platform.OS === 'android' ? 0 : event.endCoordinates.height;
            setKeyboardOptionHeight(changedHeight);
            setKeyboardHeight(event.endCoordinates.height);
            setShowKeyboardHideIcon(true);
        });
    
        return () => {
          keyboardDidShowListener.remove();
        };
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    };
  
    const onSubmit = () => {
        hideKeyboard();
        const answerForm = {
            id: qna?.answer?.id,
            bookId: 1,
            questionId: Number(qId),
            contents: text,
            share: isShare
        } as AnswerForm;

        AnswerApi.save(answerForm).then((result) => {
            if (result.status == 200) {
                hideKeyboard();
                setShowModal(true);
            }
        });
    };

    const onChangeText = (inputText: string) => {
        setText(inputText);
    };

    const isTextEmpty = () => {
        return text === '';
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
        setShowKeyboardHideIcon(false);
        setKeyboardHeight(20);
        setKeyboardOptionHeight(20);
    }

    // textInput 아무곳이나 눌러도 키보드가 뜨도록 길이를 길게
    const placeholder = 
        "나의 생각을 적어보세요.\n\n" + 
        "- 부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20}}>
                <TouchableOpacity onPress={() => hideKeyboard()} activeOpacity={1}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 40}}>
                            <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity style={isTextEmpty() ? defaultStyles.buttonOpaquely : defaultStyles.button} 
                                    onPress={onSubmit} activeOpacity={0.7} disabled={isTextEmpty()}>
                            <Text style={defaultStyles.fontMWhite}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    {!isLoading && (<View style={{paddingTop: 20}}>
                        <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화·DAY {qna?.question.dayCount}</Text>
                        <Text style={[defaultStyles.fontMBold, {marginTop: 20}]}>{qna?.question.contents}</Text>
                    </View>)}
                </TouchableOpacity>
                <TextInput
                    style={[defaultStyles.textInput, {maxHeight: Dimensions.get('window').height - keyboardHeight - 300}]}
                    onChangeText={onChangeText}
                    multiline={true}
                    value={text}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.placeholder}
                />
            </View>
            <View style={{ position: 'absolute', bottom: keyboardOptionHeight, left: 0, right: 0, padding: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text style={defaultStyles.fontS}>공유</Text>
                    <Switch
                        trackColor={{false: Colors.grey, true: Colors.primary}}
                        thumbColor={isShare ? Colors.white : Colors.lightGrey}
                        onValueChange={() => setIsShare(!isShare)}
                        value={isShare}
                    />
                </View>
                {showKeyboardHideIcon && (
                    <TouchableOpacity onPress={() => hideKeyboard()}>
                        <MaterialIcons name="keyboard-hide" size={28} color={Colors.lightGray} />
                    </TouchableOpacity>
                )}
            </View>
            {showModal && (
                <CustomModal 
                    visible={showModal} 
                    onRequestClose={() => {
                        setShowModal(false);
                        handleGoBack();
                    }}
                    onConfirm={() => {
                        setShowModal(false);
                        handleGoBack();
                    }}
                    message='저장에 성공했어요 :)'
                    smallButton={true}
                />
            )}
        </View>
    )
}

export default Question;