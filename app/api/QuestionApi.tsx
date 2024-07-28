import Api from "./Api";

const findTodayQuestion = (bookId: number) => {
    return Api.get(`/questions/today?bookId=${bookId}`);
}

const findById = (qId: number) => {
    return Api.get(`/questions/${qId}`);
}

export default {
    findTodayQuestion,
    findById
}