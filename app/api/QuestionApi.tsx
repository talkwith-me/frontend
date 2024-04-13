import { get } from "./Api";

const findTodayQuestion = (bookId: number) => {
    return get(`/questions/today?bookId=${bookId}`);
}

const findById = (qId: number, bookId: number) => {
    return get(`/questions/${qId}?bookId=${bookId}`);
}

export default {
    findTodayQuestion,
    findById
}