import UserApi from "@/app/api/UserApi";
import PushUtil from "@/app/util/PushUtil";
import { Platform, Share } from "react-native";

const confirmPush = function() {
    PushUtil.registerForPushNotificationsAsync()
        .then((token) => saveExpoToken(token ?? ''))
        .catch((error) => console.log(error));
}

const saveExpoToken = (token: string) => {
    if (token !== '') {
        UserApi.saveExpoToken(token);
    }
}

const onShare = () => {
    console.log("onShare");
    const title = "나와의 대화 | 나와의 대화로 찾아가는 나만의 가치";
    const message = "https://talkwith-me.github.io";
    const url = "https://talkwith-me.github.io";

    const shareOptions = 
        Platform.OS === 'ios'
        ? { message: title, url: url }
        : { title: title, message: message };

    setTimeout(() => Share.share(shareOptions), 100);
};

export default {
    confirmPush,
    onShare
}