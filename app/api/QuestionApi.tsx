import {get, post} from "./Api"

const findTodayQuestion = (bookId: number) => {
    return get(`/questions/today?bookId=${bookId}`);
}

export default {
    findTodayQuestion
}