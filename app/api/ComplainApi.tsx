import Api from "./Api";

const saveAnswerComplain = (answerId: number) => {
    return Api.post(`/complains/answer/${answerId}`, {});
}

export default {
    saveAnswerComplain
}