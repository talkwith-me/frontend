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
    // questionId
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
                    <Text style={[defaultStyles.fontS, {marginTop: 10}]}>나와의 대화·DAY 1</Text>
                    <Text style={[defaultStyles.fontMBold, {marginTop: 20}]}>행복함을 느끼는 순간을 알려주세요.{'\n'}사소한 것도 좋아요!</Text>
                    <View style={{alignItems: 'flex-end', marginTop: 10}}>
                        <View style={{flexDirection: 'row', gap: 3}}>
                            <Octicons name="comment" size={14} color={Colors.grey} />
                            <Text style={defaultStyles.fontS}>{3}</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 7, backgroundColor: Colors.lightGrey}}/>
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
                <Text style={defaultStyles.fontSPrimary}>곰돌이님</Text>
                <Text style={[defaultStyles.fontM, {marginTop: 10}]}>전 짜장면 먹을 때 행복하던데요ㅎㅎㅎ{'\n'}세상 모든 음식이 짜장면만 같으면 좋겠어요~</Text>
                <Text style={[defaultStyles.fontS, {marginTop: 15}]}>2024.03.29 20:31</Text>
            </View>
            <View style={{height: 1, backgroundColor: Colors.lightGrey}}/>
        </View>
    );
}

export default Share;