import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ValidUtil } from '../util/ValidUtil';

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

  const sendLoginCode = () => {
    setLoginCodeSent(LoginCodeSendStatus.SENDING);
    setTimeout(() => {
      setLoginCodeSent(LoginCodeSendStatus.SENT);
    }, 1000);
  }

  const login = () => {
    const loginForm = {
      email,
      loginCode
    };
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
              <Text style={[defaultStyles.fontL, {fontSize: 16, marginBottom: 10}]}>가입시 입력한 이메일을 알려주세요.</Text>
              <View style={{flex: 1, gap: 10}}>
                <Text style={defaultStyles.fontM}>·이메일로 4자리 인증번호를 보내드려요.{'\n'}  보내드린 인증번호를 입력해주세요 :)</Text>
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
                      autoCapitalize='none'
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
      </View>
    </TouchableWithoutFeedback>
  )
}

export default login