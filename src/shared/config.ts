export const appConfig = {
    appName: 'next-book-store',
    auth: {
        token: {
            expiresIn: 60 * 60 * 24 * 7,
        },
    },
    protectedRoutes: ['/api/books', '/api/cart', '/'],
    apiRoutes: {
        login: '/api/auth/login',
    },
    routes: {
        home: '/',
    },
};
