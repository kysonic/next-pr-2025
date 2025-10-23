export interface User {
    userId: number;
    email: string;
    role?: 'admin' | 'user';
}

export function UserGuard(user: unknown): user is User {
    return (
        typeof user === 'object' &&
        user !== null &&
        typeof (user as User).userId === 'number' &&
        typeof (user as User).email === 'string' &&
        ((user as User).role === undefined ||
            ['admin', 'user'].includes((user as User).role as string))
    );
}
