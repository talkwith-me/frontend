import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react';
import { Link, Stack, router, useFocusEffect, useRouter } from 'expo-router'
import Header from '@/components/Header'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';


const timeline = () => {
    return (
        <View style={{flex: 1}}>
            <Stack.Screen options={{
                header: () => <Header title={"경험 분석"} />
            }} />
            <View style={{flex: 1}}>
                <HorizontalTimeline />
            </View>
            <View style={{flex: 3}}>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', padding: 20}}>
                    <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>나의 타임라인 🕰️</Text>
                </View>
                <TimelineCards />
            </View>
            <AddTimeline />
        </View>
    )
}

const HorizontalTimeline = () => {
    return (
        <ScrollView horizontal={true} style={{flex: 1, padding: 18, paddingTop: 10, backgroundColor: 'white', marginTop: 10}} showsHorizontalScrollIndicator={false}>
            <View style={{gap: 3}}>
                <Text style={defaultStyles.fontSBold}>2024년</Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>10월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>9월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>6월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>3월</Text>
                    </View>
                </View>
            </View>
            <View style={{gap: 3, marginLeft: 20}}>
                <Text style={defaultStyles.fontSBold}>2023년</Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>12월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>9월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>6월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>3월</Text>
                    </View>
                </View>
            </View>
            <View style={{gap: 3, marginLeft: 20}}>
                <Text style={defaultStyles.fontSBold}>2022년</Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>12월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>9월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>6월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>3월</Text>
                    </View>
                </View>
            </View>
            <View style={{gap: 3, marginLeft: 20}}>
                <Text style={defaultStyles.fontSBold}>2021년</Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>12월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>9월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>6월</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={defaultStyles.fontS}>3월</Text>
                    </View>
                </View>
            </View>
            <View style={{width: 40}}/>
            <View style={{position: 'absolute', backgroundColor: 'orange', justifyContent: 'center', width: 320, height: 25, top: 42, borderRadius: 10}}>
                <Text style={[defaultStyles.fontSBold, {alignSelf: 'center'}]}>카카오</Text>
            </View>
            <View style={{position: 'absolute', backgroundColor: 'pink', justifyContent: 'center', width: 120, height: 25, top: 70, borderRadius: 10}}>
                <Text style={[defaultStyles.fontSBold, {alignSelf: 'center'}]}>나와의 대화</Text>
            </View>
            <View style={{position: 'absolute', backgroundColor: 'lightblue', justifyContent: 'center',width: 120, height: 25, top: 42, borderRadius: 10, marginLeft: 320}}>
                <Text style={[defaultStyles.fontSBold, {alignSelf: 'center'}]}>SW 마에스트로</Text>
            </View>
            <View style={{position: 'absolute', backgroundColor: 'lightgreen', justifyContent: 'center',width: 120, height: 25, top: 42, borderRadius: 10, marginLeft: 470}}>
                <Text style={[defaultStyles.fontSBold, {alignSelf: 'center'}]}>우아한테크코스</Text>
            </View>
        </ScrollView>
    );
}


const TimelineCards = () => {
    return (
        <ScrollView style={{flex: 3, padding: 20, paddingTop: 0}} overScrollMode='never'>
            <View style={{gap: 10}}>
                <TouchableOpacity style={defaultStyles.card} activeOpacity={0.6}>
                    <Text style={[defaultStyles.fontML, {marginBottom: 6}]}>카카오</Text>
                    <Text style={[defaultStyles.fontSBlack, {marginBottom: 12}]}>비즈메시지 개발파트 개발자</Text>
                    <Text style={[defaultStyles.fontSBlack, {marginBottom: 6}]}>역할 : 팀원</Text>
                    <Text style={[defaultStyles.fontSBlack, {marginBottom: 6}]}>기간 : 2022.12 ~ </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[defaultStyles.fontSBlack]}>작성된 경험 수 : 0</Text>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Entypo name="dots-three-horizontal" size={14} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyles.card} activeOpacity={0.6}>
                    <Text style={[defaultStyles.fontML, {marginBottom: 6}]}>SW 마에스트로</Text>
                    <Text style={[defaultStyles.fontSBlack, {marginBottom: 12}]}>연수생 3명이서 합을 모아 프로젝트 진행</Text>
                    <Text style={[defaultStyles.fontSBlack, {marginBottom: 6}]}>역할 : 연수생</Text>
                    <Text style={[defaultStyles.fontSBlack, {marginBottom: 6}]}>기간 : 2022.04 ~ 2022.12</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[defaultStyles.fontSBlack]}>작성된 경험 수 : 0</Text>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Entypo name="dots-three-horizontal" size={14} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={{height: 40}}/>
            </View>
        </ScrollView>
    );
}

const AddTimeline = () => {
    
    return (
        <TouchableOpacity style={defaultStyles.floatingPlusButton} activeOpacity={0.8} onPress={() =>router.push('(timeline)/0')}>
            <Text style={defaultStyles.fontMBoldwhite}>+</Text>
        </TouchableOpacity>
    );
}

export default timeline;