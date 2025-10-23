import { api } from '@/api';
import type { LoginSchemaType } from '@/shared/validation';
import { ErrorGuard } from '@/types/common';
import { makeAutoObservable } from 'mobx';
import type { Nullable } from '@/types/utils';
import { UserGuard, type User } from '@/entities/User';

export class AuthStore {
    user: Nullable<User> = null;

    // Login
    isLoginLoading = false;
    loginServerError = '';
    // Me
    isMeLoading = false;
    meServerError = '';

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }

    async login(payload: LoginSchemaType) {
        try {
            this.isLoginLoading = true;
            const result = await api.login(payload);
            if (UserGuard(result.user)) {
                this.setUser(result.user);
            }
        } catch (err) {
            if (ErrorGuard(err)) {
                this.loginServerError = err.message;
            }
        } finally {
            this.isLoginLoading = false;
        }
    }

    async me() {
        try {
            this.isMeLoading = true;
            const result = await api.me();
            if (UserGuard(result.user)) {
                this.setUser(result.user);
            }
        } catch (err) {
            if (ErrorGuard(err)) {
                this.meServerError = err.message;
            }
        } finally {
            this.isMeLoading = false;
        }
    }
}

export const authStore = new AuthStore();
