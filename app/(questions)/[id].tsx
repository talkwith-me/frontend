import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const Question = () => {
    // questionId
    const { id } = useLocalSearchParams<{id: string}>();
    const [text, setText] = useState('');
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const onChangeText = (inputText: string) => {
      setText(inputText);
    };
  
    const onSubmit = () => {
      console.log('Submitted:', text);
    };

    const isTextEmpty = () => {
        return text === '';
    }

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 40}}>
                        <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                    <TouchableOpacity style={isTextEmpty() ? defaultStyles.buttonOpaquely : defaultStyles.button} 
                                    activeOpacity={0.7} disabled={isTextEmpty()}>
                        <Text style={{color: Colors.white, fontFamily: 'ngc', fontSize: 14}}>저장</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[defaultStyles.fontS, {marginTop: 20}]}>나와의 대화·DAY 1</Text>
                    <Text style={[defaultStyles.fontM, {marginTop: 20}]}>테스트 질문{'\n'}테스트 질문</Text>
                </View>
                <TextInput
                    style={defaultStyles.textInput}
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                    placeholder="나의 생각을 적어보세요."
                    // autoFocus={isTextEmpty()}
                />
            </View>
        </View>
    )
}

export default Question;