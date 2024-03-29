import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, Button } from 'react-native';
import { Octicons } from '@expo/vector-icons';

const Share = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const navigation = useNavigation();

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
            <ScrollView>
                <View style={{padding: 20, paddingTop: 0}}>
                    <Text style={[defaultStyles.fontS, {marginTop: 20}]}>나와의 대화 | DAY 1</Text>
                    <Text style={[defaultStyles.fontM, {marginTop: 20}]}>돈을 얼마나 벌고 싶나요?{'\n'}그 돈을 어떻게 쓰고 싶나요?</Text>
                    <View style={{alignItems: 'flex-end', marginTop: 10}}>
                        <View style={{flexDirection: 'row', gap: 3}}>
                            <Octicons name="comment" size={14} color={Colors.grey} />
                            <Text style={defaultStyles.fontS}>{14}</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 7, backgroundColor: Colors.lightGrey}}/>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </ScrollView>
        </View>
    )
}

const Comment = () => {
    return (
        <View>
            <View style={defaultStyles.commentElement}>
                <Text style={defaultStyles.fontSPrimary}>춤추는 고구마님</Text>
                <Text style={[defaultStyles.fontM, {marginTop: 10}]}>제가 사랑하는 삶을 살아가기 위해서는 많은 돈이 필요하지 않다는 것을 깨달았어요.{'\n'}매달 300만원을 벌 수 있으면 충분할 것 같아요 :)</Text>
                <Text style={[defaultStyles.fontS, {marginTop: 15}]}>2024.03.29 20:31</Text>
            </View>
            <View style={{height: 1, backgroundColor: Colors.lightGrey}}/>
        </View>
    );
}

export default Share;