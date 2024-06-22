import { Book } from "./Book";

export interface User {
    id: number;
    nickname: string;
    imageUrl?: string;
    email: string;
    status: string;
    createdAt: Date;
    lastLoginAt: Date;
    alarmTime: string;
}

export interface UserWithBook {
    user: User;
    book: Book;
}

export interface UserForm {
    nickname: string;
    email: string;
}

export interface LoginForm {
    email: string;
    loginCode: number;
}