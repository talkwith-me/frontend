const validNickname = (nickname: string) => {
    return nickname.length <= 10;
}

const validEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 

export const ValidUtil = {
    validNickname,
    validEmail
}