import type { AuthLoginResponse } from '@/pages/api/auth/login';
import type { UserMeResponse } from '@/pages/api/auth/me';
import type { LoginSchemaType } from '@/shared/validation';

class BaseApi {
    async post(url: string, body: object) {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
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
        return await this.post('/api/auth/login', body);
    }

    async me(): Promise<UserMeResponse> {
        return await this.get('/api/auth/me');
    }
}

export const api = new NextBookShopApi();
