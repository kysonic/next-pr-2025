import { makeAutoObservable } from 'mobx';
import type { User } from '@/entities/User';
import type { Nullable } from '@/types/utils';

export class UserStore {
    user: Nullable<User> = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }
}

export const userStore = new UserStore();
