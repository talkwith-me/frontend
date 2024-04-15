import * as SecureStore from 'expo-secure-store';
import Api from '../api/Api';

const TOKEN_KEY = 'twm-token'

const saveToken = async (token: string) => {
    Api.setToken(token);
    await SecureStore.setItemAsync(TOKEN_KEY, token);
}

const deleteToken = async () => {
    Api.setToken('');
    await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export default {
    saveToken,
    deleteToken
}