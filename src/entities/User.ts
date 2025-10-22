export interface User {
    userId: number;
    email: string;
    role?: 'admin' | 'user';
}
