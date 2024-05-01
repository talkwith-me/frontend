import Api from "./Api";

const blockUser = (userId: number) => {
    return Api.post(`/blocks/user/${userId}`, {});
}

export default {
    blockUser
}