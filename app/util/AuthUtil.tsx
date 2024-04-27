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

const getAndSaveToken = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token != null) {
        saveToken(token);
    }
}

export default {
    saveToken,
    deleteToken,
    getAndSaveToken
}