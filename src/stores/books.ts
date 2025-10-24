import { api } from '@/api';
import { ErrorGuard } from '@/types/common';
import { makeAutoObservable } from 'mobx';
import type { Book } from '@/entities/Book';

export class BooksStore {
    book?: Book;
    books?: Book[] = [];

    // GetBooks
    isGetBooksLoading = false;
    getBooksServerError = '';

    // GetBook
    isGetBookLoading = false;
    getBookServerError = '';

    constructor() {
        makeAutoObservable(this);
    }

    async getBooks() {
        try {
            this.isGetBooksLoading = true;
            const result = await api.getBooks();

            this.books = result.books;
        } catch (err) {
            if (ErrorGuard(err)) {
                this.getBooksServerError = err.message;
            }
        } finally {
            this.isGetBooksLoading = false;
        }
    }

    async getBook(id: number) {
        try {
            this.isGetBookLoading = true;
            const result = await api.getBook(id);

            this.book = result.book;
        } catch (err) {
            if (ErrorGuard(err)) {
                this.getBookServerError = err.message;
            }
        } finally {
            this.isGetBookLoading = false;
        }
    }

    async favorite(id: number) {
        await api.favorite(id);
    }

    async toCart(id: number) {
        await api.addToCart(id);
    }
}

export const booksStore = new BooksStore();
