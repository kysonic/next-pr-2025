import type { AuthLoginResponse } from '@/pages/api/auth/login';
import type { AuthLogoutResponse } from '@/pages/api/auth/logout';
import type { UserMeResponse } from '@/pages/api/auth/me';
import { AuthRegisterResponse } from '@/pages/api/auth/register';
import { BooksResponse } from '@/pages/api/books';
import { BookResponse } from '@/pages/api/books/[id]';
import { FavoriteResponse } from '@/pages/api/favorite';
import { appConfig } from '@/shared/config';
import type { LoginSchemaType, RegisterSchemaType } from '@/shared/validation';

class BaseApi {
    async post(url: string, body?: object) {
        const response = await fetch(url, {
            method: 'POST',
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        return this.handleResponse(response);
    }

    async get(url: string) {
        const response = await fetch(url, {
            credentials: 'include',
        });

        return this.handleResponse(response);
    }

    async handleResponse(response: Response) {
        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || errorData.error;
            throw new Error(errorMessage);
        }
    }
}

export class NextBookShopApi extends BaseApi {
    async login(body: LoginSchemaType): Promise<AuthLoginResponse> {
        return await this.post(appConfig.apiRoutes.login, body);
    }

    async register(body: RegisterSchemaType): Promise<AuthRegisterResponse> {
        return await this.post(appConfig.apiRoutes.login, body);
    }

    async logout(): Promise<AuthLogoutResponse> {
        return await this.post(appConfig.apiRoutes.logout);
    }

    async me(): Promise<UserMeResponse> {
        return await this.get(appConfig.apiRoutes.userMe);
    }

    async getBooks(): Promise<BooksResponse> {
        return await this.get(appConfig.apiRoutes.getBooks);
    }

    async getBook(id: number): Promise<BookResponse> {
        return await this.get(appConfig.apiRoutes.getBook(id));
    }

    async favorite(id: number): Promise<FavoriteResponse> {
        return await this.post(appConfig.apiRoutes.favorite, { id });
    }

    async addToCart(id: number): Promise<FavoriteResponse> {
        return await this.post(appConfig.apiRoutes.addToCart, { id });
    }
}

export const api = new NextBookShopApi();
