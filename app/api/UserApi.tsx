import { LoginForm, UserForm } from "../model/User";
import Api from "./Api";

const findMyself = () => {
    return Api.get('/users/me');
}

const signup = (userForm: UserForm) => {
    return Api.post('/users/signup', userForm);
}

const loginCode = (email: String) => {
    return Api.post('/users/loginCode', {email: email});
}

const login = (loginForm: LoginForm) => {
    return Api.post('/users/login', loginForm);
}

const refresh = () => {
    return Api.get('/refresh');
}

const changeProfile = (userForm: UserForm) => {
    return Api.post('/users/profile', userForm);
}

const saveExpoToken = (token: string) => {
    return Api.post('/users/expoToken', {expoToken: token});
}

export default {
    findMyself,
    signup,
    login,
    loginCode,
    refresh,
    changeProfile,
    saveExpoToken
}