import { AnswerForm } from "../model/Answer";
import Api from "./Api";

const findHistories = (bookId: number) => {
    return Api.get(`/answers/histories?bookId=${bookId}`);
}

const findOthers = (bookId: number) => {
    return Api.get(`/answers/others?bookId=${bookId}`);
}

const findOtherAnswersByQuestionId = (questionId: number) => {
    return Api.get(`/answers/others/${questionId}`);
}

const save = (answerForm: AnswerForm) => {
    return Api.post('/answers', answerForm);
}

export default {
    findHistories,
    findOthers,
    findOtherAnswersByQuestionId,
    save
}