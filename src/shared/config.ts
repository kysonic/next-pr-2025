export const appConfig = {
    appName: 'next-book-store',
    auth: {
        token: {
            expiresIn: 60 * 60 * 24 * 7,
        },
    },
    protectedRoutes: ['/api/books', '/api/cart', '/book/**', '/', '/cart'],
    apiRoutes: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        userMe: '/api/auth/me',
        getBooks: '/api/books',
        favorite: '/api/favorite',
        addToCart: '/api/cart',
        getCart: '/api/cart',
        checkout: '/api/checkout',
        getBook: (id: number) => `/api/books/${id}`,
    },
    routes: {
        home: '/',
        login: '/auth/login',
    },
};
