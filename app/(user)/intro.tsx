import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface loginPage {
    order: number;
    imageUrl?: string;
    title: string;
}

const intro = () => {
    const [page, setPage] = useState(1);
    const offset = 10;
    const gap = 10
    const pageWidth = Math.round(Dimensions.get('window').width) * 0.9;

    const router = useRouter();

    const onScroll = (e: any) => {
        const newPage = Math.round(e.nativeEvent.contentOffset.x / (pageWidth + gap)) + 1;
        setPage(newPage);
    };

    const signup = () => {
        router.push('/(user)/signup');
    }

    const login = () => {
        router.push('/(user)/login');
    }

    function renderItem({ item }: any) {
        const loginPage = item as loginPage;
        return (
            loginPage.order === 4
            ? (
                <View style={{ width: pageWidth, marginHorizontal: gap / 2, padding: 10, paddingTop: 100, paddingBottom: 100, flex: 1}}>
                    <Image source={require('../../assets/images/logo-circle.png')} style={{width: 'auto', resizeMode: 'contain', height: 70, marginBottom: 35}} />
                    <View style={{flex: 2, gap: 15}}>
                        <Text style={[defaultStyles.fontL, {fontSize: 22, lineHeight: 40, textAlign: 'center'}]}>나와의 대화</Text>
                        <Text style={[defaultStyles.fontM, {fontSize: 16, lineHeight: 28, textAlign: 'center'}]}>나와의 대화를{'\n'}통해 찾아가는{'\n'}나만의 가치</Text>
                    </View>
                    <View style={{flex: 1, gap: 15}}>
                        <TouchableOpacity
                            onPress={signup} 
                            activeOpacity={0.7} 
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: Colors.primary, padding: 20, borderRadius: 10}}>
                            <Text style={defaultStyles.fontMBoldwhite}>시작하기</Text>
                        </TouchableOpacity>
                        <View style={{gap: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[defaultStyles.fontM, {textAlign: 'center'}]}>
                                이미 계정이 있나요?
                            </Text>
                            <TouchableOpacity onPress={login}>
                                <Text style={[defaultStyles.fontMBoldPrimary, {textAlign: 'center'}]}>로그인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
            : (
                <View style={{ width: pageWidth, marginHorizontal: gap / 2, padding: 1, paddingTop: 35, paddingBottom: 100, flex: 1}}>
                    <Text style={[defaultStyles.fontL, {lineHeight: 30, textAlign: 'center', flex: 1}]}>{loginPage.title}</Text>
                    <Image 
                        source={loginPage.imageUrl} 
                        style={{ 
                            width: 'auto', resizeMode: 'contain', flex: 5, 
                            borderWidth: 5, borderColor: Colors.lightGrey, borderRadius: 5, 
                            backgroundColor: loginPage.order === 1 ? Colors.lightGrey : Colors.white
                        }} 
                    />
                </View>
            )
        );
    }

    const pages = [
        { order: 1, imageUrl: require('../../assets/images/login_1.jpg'), title: '매일 저녁 10시,\n오늘의 질문을 보내드려요' } as loginPage,
        { order: 2, imageUrl: require('../../assets/images/login_2.jpg'), title: '생각을 기록하며\n나 자신과 더 가까워지세요' } as loginPage,
        { order: 3, imageUrl: require('../../assets/images/login_3.jpg'), title: '답변한 질문에 대해\n다양한 생각을 만나보세요' } as loginPage,
        { order: 4 } as loginPage,
    ];

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 40}}>
                <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 1 ? Colors.primary : Colors.lightGray}} />
                <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 2 ? Colors.primary : Colors.lightGray}} />
                <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 3 ? Colors.primary : Colors.lightGray}} />
                <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 4 ? Colors.primary : Colors.lightGray}} />
            </View>
            <FlatList
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

export default intro