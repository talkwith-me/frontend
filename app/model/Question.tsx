import { Answer } from "./Answer";

export interface Question {
    id: number;
    bookId: number;
    contents: string;
    dayCount: number;
    status: string;
}

export interface QuestionWithAnswer {
    question: Question;
    answer: Answer;
}

export interface QuestionWithAnswers {
    question: Question;
    answers: Answer[];
}