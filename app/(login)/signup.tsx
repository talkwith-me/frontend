import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, TextInput, Keyboard, Dimensions, FlatList } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import CustomModal from '@/components/CustomModal';

const signup = () => {
  const navigation = useNavigation();
  const flatList = useRef<FlatList>();
  const pageWidth = Math.round(Dimensions.get('window').width) * 1;
  const [page, setPage] = useState(1);

  const [email, setEmail] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined);
  const [showEmailFailModal, setShowEmailFailModal] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>('');
  const [nicknameValid, setNicknameValid] = useState<boolean | undefined>(undefined);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    Keyboard.dismiss();
    if (emailRegex.test(email)) {
      setEmailValid(true);
      setTimeout(() => {
        flatList!.current!.scrollToIndex({index: 1});
      }, 500);
    } else {
      setEmailValid(false);
      setShowEmailFailModal(true);
    }
  }

  useEffect(() => {
    if (nickname == '조엘') {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  }, [nickname]);

  const signupAfterValidation = () => {
    const userForm = {
      email: email, 
      nickname: nickname
    };
  }

  const pages = [1, 2];

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / (pageWidth)) + 1;
    setPage(newPage);
  };

  function renderItem({ item }: any) {
    const page = item as number;
    if (page === 1) {
      return (
        <View style={{padding: 30, width: pageWidth}}>
          <View style={{flex: 1, gap: 10}}>
            <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>이메일 주소를 작성해주세요.</Text>
            <View style={{flex: 1, gap: 10}}>
              <Text style={defaultStyles.fontM}>·로그인 시, 이메일로 인증코드를 보내드려요.{'\n'}  해당 인증코드를 통해 로그인 할 수 있어요.</Text>
              <Text style={defaultStyles.fontM}>·이메일로 주요 서비스 소식을 알려드려요.</Text>
            </View>
          </View>
          <View style={{flex: 3, gap: 10}}>
            {emailValid && <Text style={[defaultStyles.fontS, {marginBottom: 10}]}>정상적인 이메일 입니다 :)</Text>}
            <TextInput 
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, padding: 15, borderRadius: 10, 
                      borderWidth: 1, borderColor: emailValid ? Colors.primary : Colors.lightGray, fontSize: 14}}
              placeholder='이메일 주소'
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
              autoCapitalize='none'
              onPressIn={() => setEmailValid(undefined)}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={validateEmail}
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, padding: 20, borderRadius: 10}}>
              <Text style={defaultStyles.fontMBoldwhite}>다음</Text>   
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{padding: 30, width: pageWidth}}>
          <View style={{flex: 1, gap: 10}}>
            <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>사용할 닉네임을 알려주세요.</Text>
            <View style={{flex: 1, gap: 10}}>
              <Text style={defaultStyles.fontM}>·나와의 대화에서 어떻게 불러드릴까요 :)</Text>
            </View>
          </View>
          <View style={{flex: 5, gap: 10}}>
            {nicknameValid && <Text style={defaultStyles.fontS}>멋진 닉네임이네요!</Text>}
            <TextInput 
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, padding: 15, borderRadius: 10, 
                      borderWidth: 1, borderColor: nicknameValid ? Colors.primary : Colors.lightGray, fontSize: 14}}
              placeholder='닉네임'
              value={nickname}
              onChangeText={(text) => setNickname(text)}
              autoCapitalize='none'
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={signupAfterValidation}
              disabled={!(emailValid && nicknameValid)}
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, padding: 20, 
                      borderRadius: 10, opacity: (emailValid && nicknameValid) ? 1 : 0.6}}>
              <Text style={defaultStyles.fontMBoldwhite}>가입하기</Text>   
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{padding: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 1 ? Colors.primary : Colors.lightGray}} />
        <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 2 ? Colors.primary : Colors.lightGray}} />
      </View>
      <FlatList 
        ref={flatList}
        data={pages}
        onScroll={onScroll}
        horizontal
        decelerationRate="fast"
        pagingEnabled
        renderItem={renderItem}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}  
        snapToInterval={pageWidth}
      />
      {!emailValid && (
        <CustomModal 
          visible={showEmailFailModal} 
          onRequestClose={() => setShowEmailFailModal(false)}
          onConfirm={() => setShowEmailFailModal(false)}
          message='이메일 주소를 확인해주세요.'
          smallButton={true}
        />
      )}
    </View>
  )
}

export default signup;