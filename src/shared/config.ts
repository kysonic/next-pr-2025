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
        logout: '/api/auth/logout',
        userMe: '/api/auth/me',
        getBooks: '/api/books',
        favorite: '/api/favorite',
        addToCart: '/api/cart',
    },
    routes: {
        home: '/',
        login: '/auth/login',
    },
};
