export interface Book {
    id: number;
    title: string;
    onBoarding: boolean;
    status?: string;
    description?: string;
    difficulty?: string;
    questionCount?: number;
}