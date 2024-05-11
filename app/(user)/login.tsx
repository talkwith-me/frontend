import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ValidUtil } from '../util/ValidUtil';
import { LoginForm } from '../model/User';
import UserApi from '../api/UserApi';
import AuthUtil from '../util/AuthUtil';
import CustomModal from '@/components/CustomModal';

enum LoginCodeSendStatus {
  NOT_SENT,
  SENDING,
  SENT
}

const login = () => {
  const router = useRouter();
  const pageWidth = Math.round(Dimensions.get('window').width) * 1;
  const [email, setEmail] = useState<string>('');
  const [loginCodeSent, setLoginCodeSent] = useState<number>(LoginCodeSendStatus.NOT_SENT);
  const [loginCode, setLoginCode] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const sendLoginCode = () => {
    setLoginCodeSent(LoginCodeSendStatus.SENDING);
    UserApi.loginCode(email).then((result) => {
      if (result.status === 200) {
        setLoginCodeSent(LoginCodeSendStatus.SENT);
      } else {
        setShowModal(true);
        setLoginCodeSent(LoginCodeSendStatus.NOT_SENT);
        setModalMessage(result.data.message);
      }
    });
  }

  const login = () => {
    const loginForm = {
      email: email,
      loginCode: Number(loginCode)
    } as LoginForm;

    UserApi.login(loginForm).then((result) => {
      if (result.status === 200) {
        AuthUtil.saveToken(result.data.accessToken);
        setTimeout(() => {
          router.replace('/');
        }, 100);
      } else {
        setShowModal(true);
        setModalMessage(result.data.message);
      }
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{padding: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={1} style={{width: 60}}>
              <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: 30, paddingTop: 25, width: pageWidth}}>
            <View style={{flex: 1, gap: 10}}>
              <View style={{minHeight: 100}}>
                <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>가입시 입력한 이메일을 알려주세요.</Text>
                <View style={{marginTop: 10, marginBottom: 10}}>
                  <Text style={defaultStyles.fontM}>·이메일로 4자리 인증번호를 보내드려요.{'\n'}  보내드린 인증번호를 입력해주세요 :)</Text>
                </View>
              </View>
              <View style={{flex: 8, gap: 10}}>
                <TextInput 
                  style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, 
                          padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.lightGray , fontSize: 14}}
                  placeholder='이메일'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  autoCapitalize='none'
                />
                <TouchableOpacity
                  disabled={!ValidUtil.validEmail(email)}
                  activeOpacity={0.6}
                  onPress={sendLoginCode}
                  style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGrey, 
                          padding: 20, borderRadius: 10, opacity: ValidUtil.validEmail(email) ? 1 : 0.5}}>
                  <Text style={[defaultStyles.fontMBold, {lineHeight: 14}]}>{'인증번호 받기'}</Text>   
                </TouchableOpacity>
                {loginCodeSent === LoginCodeSendStatus.SENDING && 
                  <ActivityIndicator size="large" color={Colors.lightGray} />
                }
                {loginCodeSent === LoginCodeSendStatus.SENT && (
                  <View style={{paddingTop: 20, gap: 10}}>
                    <TextInput 
                      style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, 
                              padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.lightGray , fontSize: 14}}
                      placeholder='인증번호'
                      value={loginCode}
                      onChangeText={(text) => setLoginCode(text)}
                      keyboardType='numeric'
                    />
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={login}
                      style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, padding: 20, borderRadius: 10}}>
                      <Text style={defaultStyles.fontMBoldwhite}>{'로그인'}</Text>   
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          {showModal && (
            <CustomModal 
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                onConfirm={() => setShowModal(false)}
                message={'가입되어 있지 않은 이메일 주소입니다.'}
                smallButton={true}
            />
          )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default login