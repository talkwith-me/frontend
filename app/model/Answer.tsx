import { Question } from "./Question";

export interface Answer {
    id: number;
    userId: number;
    questionId: number;
    bookId: number;
    contents: string;
    share: boolean;
    createdAt: Date;
    modifiedAt: Date;
}

export interface AnswerForm {
    id?: number;
    bookId: number;
    questionId: number;
    contents: string;
    share: boolean;
}

export interface QuestionWithAnswer {
    question: Question;
    answer?: Answer;
}

export interface QuestionWithAnswers {
    question: Question;
    answers: Answer[];
}

export interface UserAnswer {
    answerId: number;
    contents: string;
    createdAt: Date;
    modifiedAt: Date;
    userId: number;
    nickname: string;
}

export interface QuestionWithUserAnswers {
    question: Question;
    userAnswers: UserAnswer[];
}