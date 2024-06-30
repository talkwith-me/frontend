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

const FONT = 'font_assigned'

const saveFont = (font: string) => {
    SecureStore.setItem(FONT, font);
}

const readFont = () => {
    return SecureStore.getItem(FONT);
}

export default {
    saveReadModal,
    getReadModal,
    deleteReadModal,
    saveFont,
    readFont
}