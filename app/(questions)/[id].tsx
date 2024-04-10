import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Dimensions, Switch } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Question = () => {
    // questionId
    const { id } = useLocalSearchParams<{id: string}>();
    const [text, setText] = useState('');
    const navigation = useNavigation();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [keyboardOptionHeight, setKeyboardOptionHeight] = useState(Platform.OS === 'android' ? 0 : 20);
    const [showKeyboardHideIcon, setShowKeyboardHideIcon] = useState(false);
    const [isShare, setIsShare] = useState(true);

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

    const onChangeText = (inputText: string) => {
      setText(inputText);
    };
  
    const onSubmit = () => {
      console.log('Submitted:', text);
    };

    const isTextEmpty = () => {
        return text === '';
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
        setShowKeyboardHideIcon(false);
        setKeyboardHeight(20);
    }

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
                                        activeOpacity={0.7} disabled={isTextEmpty()}>
                            <Text style={{color: Colors.white, fontFamily: 'ngc', fontSize: 14}}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 20}}>
                        <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화·DAY 4</Text>
                        <Text style={[defaultStyles.fontMBold, {marginTop: 20}]}>어린 시절 꿈을 알려주세요.{'\n'}어떤 이유로 그 꿈을 꾸었나요?</Text>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={[defaultStyles.textInput, {maxHeight: Dimensions.get('window').height - keyboardHeight - 300}]}
                    onChangeText={onChangeText}
                    multiline={true}
                    placeholder="나의 생각을 적어보세요."
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
        </View>
    )
}

export default Question;