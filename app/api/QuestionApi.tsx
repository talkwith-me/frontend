import Api from "./Api";

const findTodayQuestion = (bookId: number) => {
    return Api.get(`/questions/today?bookId=${bookId}`);
}

const findById = (qId: number, bookId: number) => {
    return Api.get(`/questions/${qId}?bookId=${bookId}`);
}

export default {
    findTodayQuestion,
    findById
}