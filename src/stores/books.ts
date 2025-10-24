import { api } from '@/api';
import { ErrorGuard } from '@/types/common';
import { makeAutoObservable } from 'mobx';
import type { Book } from '@/entities/Book';

export class BooksStore {
    books?: Book[] = [];

    // GetBooks
    isGetBooksLoading = false;
    getBooksServerError = '';

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
}

export const booksStore = new BooksStore();
