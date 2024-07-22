import React, { useState, useRef } from 'react';
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const change = () => {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white}}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
                    <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={[defaultStyles.bodyContainer, {paddingTop: 0, paddingBottom: 60}]}>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20, gap: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>질문지 변경하기</Text>
                        <MaterialCommunityIcons name="bookshelf" size={22} color="black" />
                    </View>
                    <Text style={[defaultStyles.fontS]}>나와의 대화가 준비한 다양한 질문들을 만나보세요</Text>
                </View>
                <View style={{marginTop: 15, gap: 13}}>
                    <Text style={defaultStyles.fontMLSecondary}> 현재 질문지</Text>
                    <View style={defaultStyles.card}>
                        <Text style={[defaultStyles.fontML]}>나와의 대화</Text>
                        <Text style={[defaultStyles.fontSBlack, {marginTop: 10, lineHeight: 20}]}>나에 대해 깊게 알아볼 수 있는 30일을 마련했어요.{"\n"}다양한 주제를 넘나들며 어떻게 살아야 할지 고민해봐요!</Text>
                        <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={defaultStyles.fontS}>진행 기간: 30일</Text>
                            <Text style={defaultStyles.fontS}>난이도: 상</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 45, gap: 13}}>
                    <Text style={defaultStyles.fontMLGrey}> 변경 가능한 질문지</Text>
                    <View style={{gap: 20}}>
                        <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}>
                            <Text style={[defaultStyles.fontML]}>딜레마에서 나는?</Text>
                            <Text style={[defaultStyles.fontSBlack, {marginTop: 10, lineHeight: 20}]}>선택에 기로에서, 어떤 선택을 하실래요?{"\n"}딜레마 상황으로 알아보는 나의 진심!</Text>
                            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={defaultStyles.fontS}>진행 기간: 10일</Text>
                                <Text style={defaultStyles.fontS}>난이도: 중상</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}>
                            <Text style={[defaultStyles.fontML]}>꿈꾸던 사랑 ❤️</Text>
                            <Text style={[defaultStyles.fontSBlack, {marginTop: 10, lineHeight: 20}]}>어떤 사랑을 하고 싶나요?{"\n"}당신이 꿈꾸는 사랑을 알려주세요.</Text>
                            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={defaultStyles.fontS}>진행 기간: 15일</Text>
                                <Text style={defaultStyles.fontS}>난이도: 하</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}>
                            <Text style={[defaultStyles.fontML]}>나의 커리어</Text>
                            <Text style={[defaultStyles.fontSBlack, {marginTop: 10, lineHeight: 20}]}>어떤 일을 하고 싶어요? 어떤 커리어를 쌓고 싶나요?{"\n"}다른 사람보다, 스스로에게 먼저 물어봐요!</Text>
                            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={defaultStyles.fontS}>진행 기간: 15일</Text>
                                <Text style={defaultStyles.fontS}>난이도: 중</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6} style={defaultStyles.card}>
                            <Text style={[defaultStyles.fontML]}>나와의 대화 온보딩</Text>
                            <Text style={[defaultStyles.fontSBlack, {marginTop: 10, lineHeight: 20}]}>나와의 대화에 오신걸 환영합니다!{"\n"}가벼운 마음으로 스스로를 알아가볼까요?</Text>
                            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={defaultStyles.fontS}>진행 기간: 3일</Text>
                                <Text style={defaultStyles.fontS}>난이도: 하</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default change