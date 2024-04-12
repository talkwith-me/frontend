import {get, post} from "./Api"

const findMyself = () => {
    return get('/users/me');
}

export default {
    findMyself
}