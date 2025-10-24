import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse, ApiError } from '@/types/common';
import { cookieService } from '@/shared/cookie';

export interface AuthLogoutResponse extends ApiResponse, ApiError {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthLogoutResponse>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    try {
        const accessTokenCookie = cookieService.createAccessTokenCookie('', {
            maxAge: 0,
        });
        res.setHeader('Set-Cookie', [accessTokenCookie]);

        res.status(201).json({
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
