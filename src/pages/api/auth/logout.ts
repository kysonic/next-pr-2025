import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse, ApiError } from '@/types/common';

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
        res.setHeader(
            'Set-Cookie',
            `accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
        );

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
