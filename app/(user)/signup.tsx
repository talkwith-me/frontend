import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, TextInput, Keyboard, Dimensions, FlatList, Linking } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import CustomModal from '@/components/CustomModal';
import { useRouter } from 'expo-router';
import { ValidUtil } from '../util/ValidUtil';
import { UserForm } from '../model/User';
import UserApi from '../api/UserApi';
import AuthUtil from '../util/AuthUtil';
import Checkbox from 'expo-checkbox';

const signup = () => {
  const router = useRouter();
  const flatList = useRef<FlatList>();
  const pageWidth = Math.round(Dimensions.get('window').width) * 1;
  const [page, setPage] = useState(1);

  const [email, setEmail] = useState<string>('');
  const [emailValid, setEmailValid] = useState<boolean | undefined>(undefined);
  const [showEmailFailModal, setShowEmailFailModal] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>('');
  const [nicknameValid, setNicknameValid] = useState<boolean | undefined>(undefined);

  const [showSignupSuccessModal, setShowSignupSuccessModal] = useState<boolean>(false);
  const [showSignupFailModal, setShowSignupFailModal] = useState<boolean>(false);
  const [signupFailMessage, setSignupFailMessage] = useState<string>('');

  const [isServiceAgree, setIsServiceAgree] = useState<boolean>(false);
  const [isPersonalAgree, setIsPersonalAgree] = useState<boolean>(false);

  const validateEmail = () => {
    Keyboard.dismiss();
    if (ValidUtil.validEmail(email)) {
      setEmailValid(true);
      setTimeout(() => {
        flatList!.current!.scrollToIndex({index: 1});
      }, 500);
    } else {
      setEmailValid(false);
      setShowEmailFailModal(true);
    }
  }

  const validateNickname = () => {
    Keyboard.dismiss();
    if (ValidUtil.validNickname(nickname)) {
      setNicknameValid(true);
      setTimeout(() => {
        flatList!.current!.scrollToIndex({index: 2});
      }, 500);
    } else {
      setNicknameValid(false);
    }
  }

  useEffect(() => {
    if (nickname === '') {
      setNicknameValid(undefined);
    } else if (ValidUtil.validNickname(nickname)) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  }, [nickname]);

  const isAllValid = () => {
    return isServiceAgree && isPersonalAgree && ValidUtil.validEmail(email) && ValidUtil.validNickname(nickname);
  }

  const signupAfterValidation = () => {
    if (!isServiceAgree || !isPersonalAgree) {
      return;
    }

    const userForm = {
      email: email, 
      nickname: nickname
    } as UserForm;

    UserApi.signup(userForm).then((result) => {
      if (result.status === 200) {
        setShowSignupSuccessModal(true);
        AuthUtil.saveToken(result.data.accessToken);
      } else {
        console.log(result.data);
        setShowSignupFailModal(true);
        setSignupFailMessage(result.data.message);
      }
    })
  }

  const confirmSignup = () => {
    setShowSignupSuccessModal(false);
    setTimeout(() => {
      router.dismissAll();
      router.replace('/');
    }, 100);
  }

  const pages = [1, 2, 3];

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / (pageWidth)) + 1;
    setPage(newPage);
  };

  const agreeAll = () => {
    if (isServiceAgree && isPersonalAgree) {
      setIsPersonalAgree(false);
      setIsServiceAgree(false);
    } else {
      setIsPersonalAgree(true);
      setIsServiceAgree(true);
    }
  }

  function renderItem({ item }: any) {
    const page = item as number;
    if (page === 1) {
      return (
        <View style={{padding: 30, width: pageWidth}}>
          <View style={{gap: 10, height: 150}}>
            <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>이메일 주소를 작성해주세요.</Text>
            <View style={{flex: 1, gap: 10}}>
              <Text style={defaultStyles.fontM}>·로그인 시, 이메일로 인증코드를 보내드려요.{'\n'}  해당 인증코드를 통해 로그인 할 수 있어요.</Text>
              <Text style={defaultStyles.fontM}>·이메일로 주요 서비스 소식을 알려드려요.</Text>
            </View>
          </View>
          <View style={{gap: 10}}>
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
              disabled={!ValidUtil.validEmail(email)}
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, padding: 20, borderRadius: 10, opacity: (ValidUtil.validEmail(email)) ? 1 : 0.6}}>
              <Text style={defaultStyles.fontMBoldwhite}>다음</Text>   
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (page === 2) {
      return (
        <View style={{padding: 30, width: pageWidth}}>
          <View style={{height: 100, gap: 10}}>
            <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>사용할 닉네임을 알려주세요.</Text>
            <View style={{flex: 1, gap: 10}}>
              <Text style={defaultStyles.fontM}>·10자 이하의 닉네임을 사용해주세요 :)</Text>
            </View>
          </View>
          <View style={{gap: 10}}>
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
              onPress={validateNickname}
              disabled={!(emailValid && nicknameValid)}
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, padding: 20, 
                      borderRadius: 10, opacity: (emailValid && nicknameValid) ? 1 : 0.6}}>
              <Text style={defaultStyles.fontMBoldwhite}>다음</Text>   
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{padding: 30, width: pageWidth}}>
          <View style={{gap: 10, height: 50}}>
            <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>약관에 동의해주세요.</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, marginBottom: 10, alignContent: 'center', alignItems: 'center'}}>
            <Checkbox 
              value={isServiceAgree && isPersonalAgree} 
              onValueChange={agreeAll} 
              style={{borderRadius: 5, borderColor: Colors.grey}}
              color={isServiceAgree ? Colors.primary : Colors.lightGrey} />
            <View style={{flexDirection: 'row', justifyContent: 'center', gap : 10, alignItems: 'center', alignContent: 'flex-end'}}>
              <TouchableOpacity onPress={agreeAll} activeOpacity={0.7}>
                <Text style={[defaultStyles.fontMBoldPrimary]}>전체 동의</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{borderBottomColor: Colors.lightGrey, borderBottomWidth: 1}} />
          <View style={{flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 10, alignContent: 'center', alignItems: 'center'}}>
            <Checkbox value={isServiceAgree} onValueChange={setIsServiceAgree} style={{borderRadius: 5, borderColor: Colors.grey}}
              color={isServiceAgree ? Colors.primary : Colors.lightGrey} />
            <View style={{flexDirection: 'row', justifyContent: 'center', gap : 10, alignItems: 'center', alignContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => setIsServiceAgree(!isServiceAgree)} activeOpacity={0.7}>
                <Text style={[defaultStyles.fontM]}>
                  [필수] 서비스 이용약관 동의 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://talkwith-me.notion.site/f7dc181dad1a435ab1682fa21f789f2b")}
                style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={[defaultStyles.fontS, {textDecorationLine: 'underline'}]}>보기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 10, marginBottom: 37.5, alignContent: 'center', alignItems: 'center'}}>
            <Checkbox value={isPersonalAgree} onValueChange={setIsPersonalAgree} style={{borderRadius: 5, borderColor: Colors.grey}}
              color={isPersonalAgree ? Colors.primary : Colors.lightGrey} />
            <View style={{flexDirection: 'row', justifyContent: 'center', gap : 10, alignItems: 'center', alignContent: 'flex-end'}}>
              <TouchableOpacity onPress={() => setIsPersonalAgree(!isPersonalAgree)} activeOpacity={0.7}>
                <Text style={[defaultStyles.fontM]}>
                  [필수] 개인정보 처리방침 동의
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://talkwith-me.notion.site/e87bbb5d9fe449109cfcc9dd34ebe17f")}
                style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                <Text style={[defaultStyles.fontS, {textDecorationLine: 'underline'}]}>보기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{gap: 10}}>
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={!isAllValid()}
              onPress={signupAfterValidation}
              style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, padding: 20, borderRadius: 10, opacity: isAllValid() ? 1 : 0.6}}>
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
        <TouchableOpacity onPress={() => router.back()} activeOpacity={1} style={{width: 60}}>
            <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 1 ? Colors.primary : Colors.lightGray}} />
        <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 2 ? Colors.primary : Colors.lightGray}} />
        <View style={{width: 10, height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: page === 3 ? Colors.primary : Colors.lightGray}} />
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
      {showSignupSuccessModal && (
        <CustomModal 
          visible={showSignupSuccessModal} 
          onRequestClose={() => confirmSignup()}
          onConfirm={() => confirmSignup()}
          message={`${nickname}님,\n나와의 대화에 오신 것을 환영해요 🎉`}
          smallButton={true}
        />
      )}
      {showSignupFailModal && (
        <CustomModal 
          visible={showSignupFailModal} 
          onRequestClose={() => setShowSignupFailModal(false)}
          onConfirm={() => setShowSignupFailModal(false)}
          message={signupFailMessage}
          smallButton={true}
        />
      )}
    </View>
  )
}

export default signup;