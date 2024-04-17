import * as SecureStore from 'expo-secure-store';

const READ_MODAL = 'readModal'

const saveReadModal = (readModal: boolean) => {
    SecureStore.setItem(READ_MODAL, String(readModal));
}

const getReadModal = () => {
    const readModal = SecureStore.getItem(READ_MODAL);
    return Boolean(readModal);
}

const deleteReadModal = () => {
    SecureStore.deleteItemAsync(READ_MODAL);
}

export default {
    saveReadModal,
    getReadModal,
    deleteReadModal
}