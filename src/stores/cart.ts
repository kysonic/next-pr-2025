import { api } from '@/api';
import { ErrorGuard } from '@/types/common';
import { makeAutoObservable } from 'mobx';
import type { Book } from '@/entities/Book';

export class CartStore {
    books?: Book[] = [];

    // GetBooks
    isGetBooksLoading = false;
    getBooksServerError = '';

    constructor() {
        makeAutoObservable(this);
    }

    async getCart() {
        try {
            this.isGetBooksLoading = true;
            const result = await api.getCart();

            this.books = result.books;
        } catch (err) {
            if (ErrorGuard(err)) {
                this.getBooksServerError = err.message;
            }
        } finally {
            this.isGetBooksLoading = false;
        }
    }

    async checkout(id: number) {
        await api.checkout(id);
    }
}

export const cartStore = new CartStore();
