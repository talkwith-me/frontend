import {get, post} from "./Api"

const findHistories = (bookId: number) => {
    return get(`/answers/histories?bookId=${bookId}`);
}

const findOthers = (bookId: number) => {
    return get(`/answers/others?bookId=${bookId}`);
}

export default {
    findHistories,
    findOthers
}