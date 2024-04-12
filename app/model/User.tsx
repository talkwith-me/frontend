export interface User {
    id: number;
    nickname: string;
    imageUrl?: string;
    authType: string;
    email?: string;
    status: string;
    createdAt: Date;
    lastLoginAt: Date;
}