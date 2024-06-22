import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('휴대폰의 [설정 > 나와의 대화]에서 알림을 허용해주세요.');
      }
      const projectId = "1f17ad22-c3ea-4b04-a699-604ccc95a09e"

      try {
      const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        return pushTokenString;
      } catch (e: unknown) {
        throw new Error('예상치 못한 오류가 발생했습니다.\n의견 보내기로 제보해주시면 감사하겠습니다 🙇‍♂️');
      }
    } else {
      throw new Error('휴대폰 설정을 확인해주세요.');
    }
}

export default {
    registerForPushNotificationsAsync
}