import { Book } from "./Book";

export interface User {
    id: number;
    nickname: string;
    imageUrl?: string;
    email: string;
    status: string;
    createdAt: Date;
    lastLoginAt: Date;
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