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