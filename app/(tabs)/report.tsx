import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import { Stack, useFocusEffect, router } from 'expo-router';
import Header from '@/components/Header';
import { defaultStyles } from '@/constants/Styles';

const report = () => {
    return (
        <View style={{flex: 1}}>
            <Stack.Screen options={{
                header: () => <Header title={"리포트"} />
            }} />
            <View style={[defaultStyles.bodyContainer, {gap: 30, flex: 1}]}>
                <MyReport />
                <ReportOptions />
            </View>
        </View>
    )
}

const MyReport = () => {
    return (
        <View style={{flex: 1}}>
            <View style={{marginBottom: 15}}>
                <Text style={[defaultStyles.fontL]}>나의 리포트 📄</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{padding: 2.5}}>
                <TouchableOpacity style={[defaultStyles.card, {marginRight: 10, width: 150}]} activeOpacity={0.6} onPress={() => router.push('/(report)/1')}>
                    <Text style={defaultStyles.fontML}>자기분석 리포트</Text>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <Text style={[defaultStyles.fontS, {marginTop: 12.5}]}>희망 직무: 개발자</Text>
                        <Text style={[defaultStyles.fontS, {marginTop: 'auto'}]}>2024.01.01</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={[defaultStyles.card, {marginRight: 10, width: 150}]} activeOpacity={0.6} onPress={() => console.log('2')}>
                    <Text style={defaultStyles.fontML}>지원동기</Text>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <Text style={[defaultStyles.fontS, {marginTop: 12.5}]}>지원 기업: 삼성전자</Text>
                        <Text style={[defaultStyles.fontS, {marginTop: 5}]}>지원 직무: IT 개발자</Text>
                        <Text style={[defaultStyles.fontS, {marginTop: 'auto'}]}>2024.01.01</Text>
                    </View>
                </TouchableOpacity> 
                <TouchableOpacity style={[defaultStyles.card, {marginRight: 10, width: 150}]} activeOpacity={0.6} onPress={() => console.log('2')}>
                    <Text style={defaultStyles.fontML}>기타 등등</Text>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <Text style={[defaultStyles.fontS, {marginTop: 12.5}]}>지원 기업: 삼성전자</Text>
                        <Text style={[defaultStyles.fontS, {marginTop: 5}]}>지원 직무: IT 개발자</Text>
                        <Text style={[defaultStyles.fontS, {marginTop: 'auto'}]}>2024.01.01</Text>
                    </View>
                </TouchableOpacity> 
            </ScrollView>
        </View>
    )
}

const ReportOptions = () => {
    return (
        <View style={{flex: 2}}>
            <View style={{marginBottom: 10}}>
                <Text style={[defaultStyles.fontL]}>리포트 생성하기 📖</Text>
            </View>
            <ScrollView style={{flex: 3, padding: 5}} overScrollMode='never' showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={[defaultStyles.card, {marginBottom: 10}]} activeOpacity={0.6} onPress={() => console.log('2')}>
                    <Text style={[defaultStyles.fontML]}>📕 자기분석 리포트</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[defaultStyles.card, {marginBottom: 10}]} activeOpacity={0.6} onPress={() => console.log('2')}>
                    <Text style={[defaultStyles.fontML]}>📗 지원동기 작성</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default report;