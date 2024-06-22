import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React, { useCallback, useContext, useState } from 'react';
import { Link, Stack, router, useFocusEffect, useRouter } from 'expo-router'
import Header from '@/components/Header'
import { defaultStyles } from '@/constants/Styles';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { UserContext } from '../_layout';
import CustomModal from '@/components/CustomModal';
import AuthUtil from '../util/AuthUtil';
import UserApi from '../api/UserApi';
import WheelPicker from 'react-native-wheely';
import { useIsFocused } from '@react-navigation/native';

const profile = () => {
  return (
    <View>
      <Stack.Screen options={{
        header: () => <Header title={"마이페이지"} />
      }} />
      <ScrollView bounces={false} overScrollMode='never'>
        <MyPage />
        <Setting />
        <Social />
      </ScrollView>
    </View>
  )
}

const MyPage = () => {
  const {user} = useContext(UserContext);

  const shortenName = (name: string) => {
    return name.substring(0, 3);
  }

  return (
    <View style={{padding: 20, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', marginTop: 10, marginBottom: 10}}>
      <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={defaultStyles.fontMwhite}>{shortenName(user.nickname)}</Text>
      </View>
      <View style={{marginLeft: 15, gap: 7.5}}>
          <Text style={defaultStyles.fontL}>{user.nickname}</Text>
          <TouchableOpacity onPress={() => router.push('/(user)/profile')}>
            <Text style={defaultStyles.fontM}>프로필 변경</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const Setting = () => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);
  const router = useRouter();

  const openPublishing = () => {
    Linking.openURL("https://slashpage.com/나와의-대화/나와의-대화-스토어").catch(err => console.error('An error occurred', err));
  }

  const logoutClick = () => {
    setShowLogoutModal(true);
  }

  const logout = () => {
    AuthUtil.deleteToken();
    setShowLogoutModal(false);
    setTimeout(() => {
      router.replace('/(user)/intro');
    }, 100);
  }

  const withdraw = () => {
    setShowWithdrawModal(false);
    UserApi.withdraw().then(() => {
      setShowThankYouModal(true);
    })
  }

  const afterWithdraw = () => {
    AuthUtil.deleteToken();
    setShowThankYouModal(false);
    setTimeout(() => {
      router.replace('/(user)/intro');
    }, 100);
  }

  return (
    <View>
      <TouchableOpacity style={defaultStyles.listElement} activeOpacity={0.6} onPress={openPublishing}>
          <Text style={defaultStyles.fontM}>나와의 대화 출판하기 📚</Text>
          <FontAwesome name="angle-right" size={21} color="black" />
      </TouchableOpacity>

      <Alarm />

      <Link href={`(webview)/1` as any} asChild>
        <TouchableOpacity style={defaultStyles.listElement} activeOpacity={0.6}>
          <Text style={defaultStyles.fontM}>공지사항</Text>
          <FontAwesome name="angle-right" size={21} color="black" />
        </TouchableOpacity>
      </Link>

      <Link href={`(webview)/2` as any} asChild>
        <TouchableOpacity style={defaultStyles.listElement} activeOpacity={0.6}>
          <Text style={defaultStyles.fontM}>의견 보내기</Text>
          <FontAwesome name="angle-right" size={21} color="black" />
        </TouchableOpacity>
      </Link>

      <Link href={`(webview)/3` as any} asChild>
        <TouchableOpacity style={defaultStyles.listElement} activeOpacity={0.6}>
          <Text style={defaultStyles.fontM}>약관</Text>
          <FontAwesome name="angle-right" size={21} color="black" />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity onPress={() => logoutClick()} activeOpacity={0.7}>
        <View style={defaultStyles.listElement}>
          <Text style={defaultStyles.fontMgrey}>로그아웃</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 20, paddingBottom: 0, paddingTop: 15}} onPress={() => setShowWithdrawModal(true)}>
        <Text style={[defaultStyles.fontS]}>회원탈퇴</Text>
      </TouchableOpacity>

      {showLogoutModal && (
        <CustomModal 
            visible={showLogoutModal}
            onRequestClose={() => setShowLogoutModal(false)}
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={logout}
            message={'로그아웃 하시겠습니까?'}
            smallButton={true}
        />
      )}
      {showWithdrawModal && (
        <CustomModal 
          visible={showWithdrawModal}
          onRequestClose={() => setShowWithdrawModal(false)}
          onCancel={() => setShowWithdrawModal(false)}
          onConfirm={withdraw}
          message={'기존에 작성된 답변이 모두 삭제됩니다.\n정말 회원탈퇴 하시겠습니까? 😢'}
          smallButton={true}
        />
      )}
      {showThankYouModal && (
        <CustomModal 
          visible={showThankYouModal}
          onRequestClose={() => setShowThankYouModal(false)}
          onConfirm={afterWithdraw}
          message={'그동안 나와의 대화와 함께해주셔서 감사합니다.\n다음에 또 인연이 닿길 바랄게요! 🙋🏻‍♂️'}
          smallButton={true}
        />
      )}
    </View>
  )
}

const Alarm = () => {
  const {user} = useContext(UserContext);
  const [showAlarmTimeModal, setShowAlarmTimeModal] = useState<boolean>(false);
  const [showAlarmChangedModal, setShowAlarmChangedModal] = useState<boolean>(false);

  const alarmHourOptions = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  const alarmMinuteOptions = ['00', '30']
  const [alarmHourIdx, setAlarmHourIdx] = useState(0);
  const [alarmMinuteIdx, setAlarmMinuteIdx] = useState(0);

  const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      findUserAlarmTime();
    }, [isFocused])
  );

  const findUserAlarmTime = () => {
    const time = user.alarmTime.split(':');
    setAlarmHourIdx(Number(time[0]));
    setAlarmMinuteIdx(time[1] === "00" ? 0 : 1);
    setShowAlarmTimeModal(false);
  }

  const alarmTimeChangeModal = () => {
    return (
      <View>
        <Text style={[defaultStyles.fontM, {marginBottom: 10}]}>오늘의 질문을 언제 보내드릴까요?</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <WheelPicker
            containerStyle={{width: 90}}
            visibleRest={1}
            selectedIndex={alarmHourIdx}
            options={alarmHourOptions}
            onChange={(index) => setAlarmHourIdx(index)}
          />
          <WheelPicker
            containerStyle={{width: 90}}
            visibleRest={1}
            selectedIndex={alarmMinuteIdx}
            options={alarmMinuteOptions}
            onChange={(index) => setAlarmMinuteIdx(index)}
          />
        </View>
      </View>
    );
  }

  const changeAlarmTime = () => {
    UserApi.changeAlarmTime(selectedAlarmTime()).then((result) => {
      if (result.status === 200) {
        setShowAlarmTimeModal(false);
        user.alarmTime = selectedAlarmTime();
        setShowAlarmChangedModal(true);
      }
    });
  }

  const selectedAlarmTime = () => {
    const hour = alarmHourOptions[alarmHourIdx];
    const minute = alarmMinuteOptions[alarmMinuteIdx];
    return `${hour}:${minute}`;
  }

  return (
    <>
      <TouchableOpacity style={defaultStyles.listElement} activeOpacity={0.6} onPress={() => setShowAlarmTimeModal(true)}>
        <Text style={defaultStyles.fontM}>알림 시간 설정하기 ⏰</Text>
        <FontAwesome name="angle-right" size={21} color="black" />
      </TouchableOpacity>

      {showAlarmTimeModal && (
        <CustomModal 
          visible={showAlarmTimeModal}
          onRequestClose={() => findUserAlarmTime()}
          onCancel={() => findUserAlarmTime()}
          onConfirm={() => changeAlarmTime()}
          body={alarmTimeChangeModal()}
          smallButton={true}
        />
      )}

      {showAlarmChangedModal && (
        <CustomModal 
          visible={showAlarmChangedModal}
          onRequestClose={() => setShowAlarmChangedModal(false)}
          onConfirm={() => setShowAlarmChangedModal(false)}
          message={`알림 시간을 ${selectedAlarmTime()}로 변경했어요 :)`}
          smallButton={true}
        />
      )}
    </>
  );
}

const Social = () => {
  const openInstagram = () => {
    Linking.openURL('instagram://user?username=talkwith_me_today').catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{alignItems: 'center', padding: 40, gap: 20, paddingTop: 20, paddingBottom: 20}}>
      <TouchableOpacity onPress={openInstagram}>
        <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center'}}>
          <FontAwesome name="instagram" size={25} color="black" />
        </View>
      </TouchableOpacity>
      <Text style={defaultStyles.fontS}>©나와의 대화. 2024</Text>
    </View>
  );
}

export default profile