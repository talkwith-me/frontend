import { AnswerForm } from "../model/Answer";
import {get, post} from "./Api"

const findHistories = (bookId: number) => {
    return get(`/answers/histories?bookId=${bookId}`);
}

const findOthers = (bookId: number) => {
    return get(`/answers/others?bookId=${bookId}`);
}

const findOtherAnswersByQuestionId = (questionId: number) => {
    return get(`/answers/others/${questionId}`);
}

const save = (answerForm: AnswerForm) => {
    return post('/answers', answerForm);
}

export default {
    findHistories,
    findOthers,
    findOtherAnswersByQuestionId,
    save
}