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