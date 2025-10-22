import { type SerializeOptions, serialize } from 'cookie';
import { config } from '@/shared/config';

class CookieService {
    constructor(private commonDefaults: SerializeOptions) {}

    createAccessTokenCookie(token: string, options?: SerializeOptions) {
        return serialize('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: config.auth.token.expiresIn,
            ...this.commonDefaults,
            ...options,
        });
    }
}

export const cookieService = new CookieService({
    path: '/',
    sameSite: 'strict',
});
