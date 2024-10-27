import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, {useState, useEffect, useCallback, useContext} from 'react'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { DateUtil } from '../../util/DateUtil';
const experience = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const navigation = useNavigation();

    const pagePadding = 20
    const gap = 10;

    // pagePadding 양쪽, gap 양쪽을 뺀만큼 그리고, 스크롤을 이 answer 만큼
    const answerWidth = Math.round(Dimensions.get('window').width) - pagePadding * 2 - gap * 2;
    const answerHeight = Math.round(Dimensions.get('window').height) * (Platform.OS === 'ios' ? 0.65 : 0.7);

    const [maxQuestionId, setMaxQuestionId] = useState<number>(0);
    const initialContentOffset = { x: (answerWidth + gap) * (maxQuestionId), y: 0 };

    return (
        <View style={{flex: 1, backgroundColor: Colors.lightGrey}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: pagePadding, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
                        <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                </View>
                <Text style={[defaultStyles.fontL, {marginTop: 20}]}>카카오에서의 경험 ✍🏻</Text>
                <ScrollView
                    horizontal
                    overScrollMode='never'
                    contentContainerStyle={{ marginTop: 20, gap: gap, padding: gap }}
                    snapToInterval={answerWidth + gap}
                    snapToAlignment="start"
                    pagingEnabled
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    contentOffset={initialContentOffset}
                    >
                    <ExperienceCard width={answerWidth} height={answerHeight} />
                    <ExperienceCard width={answerWidth} height={answerHeight} />
                </ScrollView>
            </View>
            <AddExperience />
        </View>
    );
}

const ExperienceCard = (props: {width: number, height: number}) => {
    const titleHeight = Math.round(Dimensions.get('window').height) * 0.1;
    const answerHeight = Math.round(Dimensions.get('window').height) * (Platform.OS === 'ios' ? 0.45 : 0.5);

    return (
        <View style={[defaultStyles.card, {width: props.width, height: props.height}]}>
            <View style={{minHeight: titleHeight, gap: 12.5, marginTop: 7.5}}>
                <Text style={[defaultStyles.fontML, {fontSize: 15}]}>
                    라운지 프로젝트 북마크 추가
                </Text>
                <View style={{flexDirection: 'row', gap: 3, alignSelf: 'flex-end'}}>
                    <Text style={defaultStyles.fontSBold}>역량: 주도성, 팀워크</Text>
                </View>
            </View>
            <ScrollView
                style={{ maxHeight: answerHeight, marginBottom: 35}} 
                bounces={false} 
                showsVerticalScrollIndicator={false}>
                <Text style={defaultStyles.fontM}>
                    데이터가 두 개의 서로 다른 MySQL 데이터베이스에 저장되어 있어 필요한 데이터를 한 번에 가져오기 어려웠음.{'\n\n'}
                    두 데이터를 ES에 저장하여 동기화 한 다음, 해당 데이터를 통해 구현{'\n\n'}
                    해당 기능을 혼자 구현하면서, 오너쉽을 가지고 일할 수 있는 환경이 나에게 더 몰입도를 높이고 만족도를 높이는 것을 느낌. {'\n\n'}
                    더 많은 사용자가 해당 기능을 쓰면 좋겠다. 
                </Text>
            </ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center', bottom: 5}}>
                <Text style={defaultStyles.fontS}>{DateUtil.convert(new Date())}</Text>
                <Link href={``} asChild>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Feather name="edit" size={18} color={Colors.grey} />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const AddExperience = () => {
    return (
        <TouchableOpacity style={[defaultStyles.floatingButton, {bottom: 50, right: 30, backgroundColor: Colors.secondary}]} activeOpacity={0.8} onPress={() => console.log('to exp')}>
            <Text style={defaultStyles.fontSWhite}>경험 추가하기</Text>
        </TouchableOpacity>
    );
}

export default experience;