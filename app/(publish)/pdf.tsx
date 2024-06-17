import React, { useState, useRef } from 'react';
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '@/constants/Styles';

interface pdfPage {
    order: number;
    qs: string;
}

const pdf = () => {
    const navigation = useNavigation();

    const flatList = useRef<FlatList>();

    const [page, setPage] = useState(1);
    const offset = 10;
    const gap = 10
    const pageWidth = Math.round(Dimensions.get('window').width) *  0.95;

    const onScroll = (e: any) => {
        const newPage = Math.round(e.nativeEvent.contentOffset.x / (pageWidth + gap)) + 1;
        setPage(newPage);
    };

    const pages = [
        {order: 1, qs: '1. 출판할 질문지를 골라주세요.'} as pdfPage,
        {order: 2, qs: '2. 표지를 골라주세요.'} as pdfPage,
        {order: 3, qs: '3. 속지를 골라주세요.'} as pdfPage,
        {order: 4, qs: '4. 전자책은 회원님의 이메일로 전송해드려요.\n(마이페이지 > 프로필 변경에서 변경할 수 있어요.)'} as pdfPage,
    ]

    const movePage = (pageNum: number) => {
        flatList!.current!.scrollToIndex({index: pageNum});
    }

    function renderItem({ item }: any) {
        console.log(item);
        const step = item as pdfPage;

        return (
            <View style={{ width: pageWidth, marginHorizontal: gap / 2, paddingTop: 30, paddingBottom: 100, flex: 1}}>
                <Text style={[defaultStyles.fontMBold]}>{step.qs}</Text>
                <View style={{backgroundColor: 'red', width: '95%'}}></View>
                <TouchableOpacity style={[defaultStyles.buttonConfirm, {width: '95%', height: 60}]} onPress={() => movePage(step.order)}>
                    <Text style={[defaultStyles.fontMwhite, {textAlign: 'center'}]}>확인</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: Colors.lightGrey}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.white}}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
                    <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
                </TouchableOpacity>
                <Text style={defaultStyles.fontL}>전자책 출판하기</Text>
            </View>
            <FlatList
                ref={flatList}
                automaticallyAdjustContentInsets={false}      
                contentContainerStyle={{
                    paddingHorizontal: offset + gap / 2,
                }}
                onScroll={onScroll}
                data={pages}
                decelerationRate="fast"
                horizontal
                pagingEnabled
                renderItem={renderItem}
                snapToInterval={pageWidth + gap}
                snapToAlignment="start"
                showsHorizontalScrollIndicator={false}  
            />
        </View>
    )
}

export default pdf