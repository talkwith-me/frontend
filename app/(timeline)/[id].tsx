import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '@/constants/Styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';
import WheelPicker from 'react-native-wheely';
import CustomModal from '@/components/CustomModal';

const timelineForm = () => {
    const { id } = useLocalSearchParams<{id: string}>();
    const navigation = useNavigation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [role, setRole] = useState("");
    const [startYearMonth, setStartYearMonth] = useState("");
    const [endYearMonth, setEndYearMonth] = useState("");

    const [isDoing, setIsDoing] = useState(false);

    const [date, setDate] = useState(new Date());

    const isCurrentlyDoing = () => {
        if (!isDoing) {
            setEndYearMonth("");
            setIsDoing(true);
        } else {
            setEndYearMonth("");
            setIsDoing(false);
        }
    }

    const [yearIdx, setYearIdx] = useState(0);
    const [monthIdx, setMonthIdx] = useState(0);
    const yearOptions = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const [isStartYearMonth, setIsStartYearMonth] = useState(true);

    const [showYearMonthModal, setShowYearMonthModal] = useState(false);
    const [showYearMonthValidation, setShowYearMonthValidation] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear().toString();
        const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      
        const yearIndex = yearOptions.indexOf(currentYear);
        const monthIndex = monthOptions.indexOf(currentMonth);
      
        setYearIdx(yearIndex !== -1 ? yearIndex : 0);
        setMonthIdx(monthIndex !== -1 ? monthIndex : 0);
    }, []);

    const yearMonthChangeModal = () => {
        return (
          <View>
            <Text style={[defaultStyles.fontM, {marginBottom: 10}]}>연도-월 선택</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <WheelPicker
                containerStyle={{width: 90}}
                visibleRest={1}
                selectedIndex={yearIdx}
                options={yearOptions}
                onChange={(index) => setYearIdx(index)}
              />
              <WheelPicker
                containerStyle={{width: 90}}
                visibleRest={1}
                selectedIndex={monthIdx}
                options={monthOptions}
                onChange={(index) => setMonthIdx(index)}
              />
            </View>
          </View>
        );
    }

    const saveYearMonth = () => {
        setShowYearMonthModal(false);
        const yearMonth = yearOptions[yearIdx] + monthOptions[monthIdx];
        if (isStartYearMonth) {
            if (endYearMonth && endYearMonth < yearMonth) {
                setShowYearMonthValidation(true);
            } else {
                setStartYearMonth(yearMonth);
            }
        } else {
            if (startYearMonth && startYearMonth > yearMonth) {
                setShowYearMonthValidation(true);
            } else {
                setEndYearMonth(yearMonth);
            }
        }
    }

    const selectYearMonth = (isStartYearMonth: boolean) => {
        setIsStartYearMonth(isStartYearMonth);
        setShowYearMonthModal(true);
        if (!isStartYearMonth) {
            setIsDoing(false);
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
                    <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={[defaultStyles.bodyContainer, {paddingTop: 0, paddingBottom: 60}]}>
                <View style={{alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20, gap: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[defaultStyles.fontL, {textAlign: 'center'}]}>타임라인 {(id === '0') ? '추가' : '수정'}하기 </Text>
                        <FontAwesome name="calendar-check-o" size={22} color="black" />            
                    </View>
                    <Text style={[defaultStyles.fontS]}> 학교, 아르바이트, 동아리, 회사 무엇이든 괜찮아요 :)</Text>

                    <Text style={[defaultStyles.fontSBlack, {marginTop: 20}]}>제목</Text>
                    <TextInput
                        style={defaultStyles.input}
                        placeholder="ex) 학교명, 아르바이트, 동아리명, 회사명 등등 "
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={[defaultStyles.fontSBlack, {marginTop: 10}]}>설명</Text>
                    <TextInput
                        style={defaultStyles.input}
                        placeholder="어떤 곳인지 조금 더 알려주세요!"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Text style={[defaultStyles.fontSBlack, {marginTop: 10}]}>역할</Text>
                    <TextInput
                        style={defaultStyles.input}
                        placeholder="어떤 역할을 했나요?"
                        value={role}
                        onChangeText={setRole}
                    />

                    <Text style={[defaultStyles.fontSBlack, {marginTop: 10}]}>기간</Text>
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity style={[defaultStyles.input, {width: '47%'}]} activeOpacity={0.7} onPress={() => selectYearMonth(true)}>
                            <Text style={defaultStyles.fontS}>{startYearMonth === "" ? '시작년월' : startYearMonth}</Text>
                        </TouchableOpacity>
                        <Text style={[defaultStyles.fontM, {alignSelf: 'center'}]}> ~ </Text>
                        <TouchableOpacity style={[defaultStyles.input, {width: '47%'}]} activeOpacity={0.7} onPress={() => selectYearMonth(false)}>
                            <Text style={defaultStyles.fontS}>{endYearMonth === "" ? isDoing ? '현재' : '종료년월' : endYearMonth}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => isCurrentlyDoing()} activeOpacity={0.7}>
                        <Checkbox value={isDoing} style={{borderRadius: 5, borderColor: Colors.grey}} color={isDoing ? Colors.primary : Colors.lightGrey} />
                        <View>
                            <Text style={[defaultStyles.fontS]}>지금 하고 있어요.</Text>
                        </View>
                    </TouchableOpacity>

                    {showYearMonthModal && (
                        <CustomModal 
                            visible={showYearMonthModal}
                            onRequestClose={() => setShowYearMonthModal(false)}
                            onCancel={() => setShowYearMonthModal(false)}
                            onConfirm={() => saveYearMonth()}
                            body={yearMonthChangeModal()}
                            smallButton={true}
                        />
                    )}

                    {showYearMonthValidation && (
                        <CustomModal 
                            visible={showYearMonthValidation}
                            onRequestClose={() => setShowYearMonthValidation(false)}
                            onConfirm={() => setShowYearMonthValidation(false)}
                            message='시작 날짜와 종료 날짜를 확인해주세요.'
                            smallButton={true}
                        />
                    )}
                    
                    <TouchableOpacity
                        onPress={() => console.log('제출')} activeOpacity={0.7} 
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15, backgroundColor: Colors.primary, padding: 15, borderRadius: 10, width: '100%'}}>
                        <Text style={defaultStyles.fontMwhite}>추가하기</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default timelineForm;
