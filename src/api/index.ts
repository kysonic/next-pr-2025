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
    async login(body: LoginSchemaType) {
        return await this.post('/api/auth/login', body);
    }
}

export const api = new NextBookShopApi();
