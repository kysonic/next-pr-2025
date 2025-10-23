import { api } from '@/api';
import type { LoginSchemaType } from '@/shared/validation';
import { ErrorGuard } from '@/types/common';
import { makeAutoObservable } from 'mobx';
import { userStore } from './user';

export class AuthStore {
    constructor(
        private isLoginLoading = false,
        private loginServerError = '',
    ) {
        makeAutoObservable(this);
    }

    async login(payload: LoginSchemaType) {
        try {
            this.isLoginLoading = true;
            const result = await api.login(payload);
            userStore.setUser(result.user);
        } catch (err) {
            if (ErrorGuard(err)) {
                this.loginServerError = err.message;
            }
        } finally {
            this.isLoginLoading = false;
        }
    }
}

export const authStore = new AuthStore();
