import { get } from "./Api";

const findMyself = () => {
    return get('/users/me');
}

export default {
    findMyself
}