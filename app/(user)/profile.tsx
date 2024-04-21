import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../_layout';
import CustomModal from '@/components/CustomModal';
import { ValidUtil } from '../util/ValidUtil';
import UserApi from '../api/UserApi';
import { UserForm } from '../model/User';

const profile = () => {
    const {user, setUser} = useContext(UserContext);
    const router = useRouter();
    const [nickname, setNickname] = useState<string>(user.nickname);
    const [email, setEmail] = useState<string>(user.email);
    
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
 
    const save = () => {
        if (!ValidUtil.validEmail(email)) {
            setModalMessage('이메일 주소를 확인해주세요.')
            setShowModal(true);
            return;
        }
        if (!ValidUtil.validNickname(nickname)) {
            setModalMessage('10자 이하의 닉네임을 사용해주세요 :)')
            setShowModal(true);
            return;
        }

        const userForm = {email: email, nickname: nickname} as UserForm;
        UserApi.changeProfile(userForm).then((result) => {
            if (result.status === 200) {
                setUser(result.data);
                setModalMessage('변경을 완료했습니다 :)')
                setShowModal(true);
            } else {
                setModalMessage(result.data.message);
                setShowModal(true);
            }
        });
    }

    const disableWhenNothing = () => {
        return nickname === '' || email === '';
    }

    return (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{padding: 20, flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => router.back()} activeOpacity={1} style={{width: 60}}>
                        <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
                    </TouchableOpacity>
                </View>
                <Text style={[defaultStyles.fontL, {marginTop: 20, marginBottom: 20}]}>프로필 수정</Text>
                <View style={{gap: 15}}>
                    <View style={{gap: 10}}>
                        <Text style={defaultStyles.fontM}>닉네임</Text>
                        <TextInput 
                            style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, 
                                    padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.lightGray , fontSize: 14}}
                            placeholder='닉네임'
                            value={nickname}
                            onChangeText={(text) => setNickname(text)}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={{gap: 10}}>
                        <Text style={defaultStyles.fontM}>이메일</Text>
                        <TextInput 
                            style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white, 
                                    padding: 15, borderRadius: 10, borderWidth: 1, borderColor: Colors.lightGray , fontSize: 14}}
                            placeholder='이메일'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize='none'
                        />
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={save}
                      disabled={disableWhenNothing()}
                      style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, 
                            padding: 20, borderRadius: 10, opacity: disableWhenNothing() ? 0.5 : 1}}>
                      <Text style={defaultStyles.fontMBoldwhite}>{'저장'}</Text>   
                    </TouchableOpacity>
                </View>
            </View>
            {showModal && (
                <CustomModal 
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                    onConfirm={() => setShowModal(false)}
                    message={modalMessage}
                    smallButton={true}
                />
            )}
        </View>
    )
}

export default profile