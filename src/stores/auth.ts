import { api } from '@/api';
import type { LoginSchemaType, RegisterSchemaType } from '@/shared/validation';
import { ErrorGuard } from '@/types/common';
import { makeAutoObservable } from 'mobx';
import type { Nullable } from '@/types/utils';
import { UserGuard, type User } from '@/entities/User';

export class AuthStore {
    user: Nullable<User> = null;

    // Login
    isLoginLoading = false;
    loginServerError = '';
    // Register
    isRegisterLoading = false;
    registerServerError = '';
    // Logout
    isLogoutLoading = false;
    logoutServerError = '';
    // Me
    isMeLoading = false;
    meServerError = '';

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: Nullable<User>) {
        this.user = user;
    }

    suspenseLogoutServerError() {
        this.logoutServerError = '';
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

    async register(payload: RegisterSchemaType) {
        try {
            this.isRegisterLoading = true;
            const result = await api.register(payload);
            if (UserGuard(result.user)) {
                this.setUser(result.user);
            }
        } catch (err) {
            if (ErrorGuard(err)) {
                this.registerServerError = err.message;
            }
        } finally {
            this.isRegisterLoading = false;
        }
    }

    async logout() {
        try {
            this.isLogoutLoading = true;
            await api.logout();
            this.setUser(null);
        } catch (err) {
            if (ErrorGuard(err)) {
                this.logoutServerError = err.message;
                throw err;
            }
        } finally {
            this.isLogoutLoading = false;
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
