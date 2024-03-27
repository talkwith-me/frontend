import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native';

const Question = () => {
    const [text, setText] = useState('');
    const { id } = useLocalSearchParams<{id: string}>();
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

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={handleGoBack} activeOpacity={1} style={{width: 40}}>
                        <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                    <TouchableOpacity style={defaultStyles.button} activeOpacity={0.6}>
                        <Text style={{color: Colors.white, fontFamily: 'ngc', fontSize: 14}}>저장</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[defaultStyles.fontS, {marginTop: 20}]}>나와의 대화 | DAY 1</Text>
                <Text style={[defaultStyles.fontM, {marginTop: 20}]}>돈을 얼마나 벌고 싶나요?{'\n'}그 돈을 어떻게 쓰고 싶나요?</Text>
                <TextInput
                    style={{ height: 250, marginTop: 30}}
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                    placeholder="나의 생각을 적어보세요."
                />
            </View>
        </SafeAreaView>
    )
}

export default Question;