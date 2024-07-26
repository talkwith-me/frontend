import React, { useContext, useEffect, useState, useMemo } from 'react';
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BookApi from '../api/BookApi';
import { Book } from '../model/Book';
import { BookContext, RefreshContext } from '../_layout';
import CustomModal from '@/components/CustomModal';
import UserApi from '../api/UserApi';

const change = () => {
    const navigation = useNavigation();

    const {book} = useContext(BookContext);
    const {refreshKey, setRefreshKey} = useContext(RefreshContext);
    const [allBooks, setAllBooks] = useState<Book[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [showBookChangeModal, setShowBookChangeModal] = useState<boolean>(false);
    const [changeTargetBook, setChangeTargetBook] = useState<Book>();

    useEffect(() => {
        BookApi.findBooks().then((result) => {
            setAllBooks(result.data);
            setLoading(false);
        })
    }, []);

    const currentBook = useMemo(() => {
        return allBooks?.find(b => b.id === book.id);
    }, [allBooks, book]);

    const otherBooks = useMemo(() => {
        return allBooks?.filter(b => b.id !== book.id);
    }, [allBooks, book]);

    const isCurrentBook = (book: Book) => {
        return currentBook?.id === book.id;
    }

    const showBookCard = (book: Book) => {
        return (
            <TouchableOpacity key={book.id} style={defaultStyles.card} activeOpacity={isCurrentBook(book) ? 1 : 0.6} onPress={() => showChangeBookModal(book)}>
                <Text style={[defaultStyles.fontML]}>{book.title}</Text>
                <Text style={[defaultStyles.fontSBlack, {marginTop: 10, lineHeight: 20}]}>{book.description}</Text>
                <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={defaultStyles.fontS}>진행 기간: {book.questionCount}일</Text>
                    <Text style={defaultStyles.fontS}>난이도: {book.difficulty}</Text>
                </View>
            </TouchableOpacity>
        );
    } 

    const showChangeBookModal = (book: Book) => {
        if (isCurrentBook(book)) return;
        setChangeTargetBook(book);
        setShowBookChangeModal(true);
    }

    const changeBook = () => {
        setShowBookChangeModal(false);
        UserApi.changeBook(changeTargetBook!.id).then((result) => {
            if (result.status === 200) {
                setRefreshKey(refreshKey + 1);
                navigation.goBack();
            }
        })
    }

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
                {loading ? <></> : (
                    <>
                        <View style={{marginTop: 15, gap: 13}}>
                            <Text style={defaultStyles.fontMLSecondary}> 현재 질문지</Text>
                            {showBookCard(currentBook!)}
                        </View>
                        {otherBooks && otherBooks.length > 0 && (
                            <View style={{marginTop: 45, gap: 13}}>
                                <Text style={defaultStyles.fontMLGrey}> 변경 가능한 질문지</Text>
                                <View style={{gap: 20}}>
                                    {otherBooks?.map(book => {
                                        return showBookCard(book);
                                    })}
                                </View>
                            </View>
                        )}
                    </>
                )}
            </ScrollView>
            {showBookChangeModal && (
                <CustomModal 
                    visible={showBookChangeModal}
                    onRequestClose={() => setShowBookChangeModal(false)}
                    onCancel={() => setShowBookChangeModal(false)}
                    onConfirm={() => changeBook()}
                    message={"[" + changeTargetBook!.title + "] 로 질문지를 변경하시겠어요?\n현재 질문지는 지금 상태로 저장됩니다."}
                    smallButton={true}
                />
            )}
        </View>
    )
}

export default change