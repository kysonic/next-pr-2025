import type { NextApiRequest, NextApiResponse } from 'next';
import { registerSchema } from '@/shared/validation';
import { handleZodSchema, ZodValidationError } from '@/shared/errors';
import { jwtService } from '@/shared/jwt';
import { cookieService } from '@/shared/cookie';
import type { ApiError, ApiResponse } from '@/types/common';

export interface AuthRegisterResponse extends ApiResponse, ApiError {
    access_token?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthRegisterResponse>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    try {
        const { email, password } = await handleZodSchema(
            registerSchema,
            req.body ?? {},
        );

        console.log('Create DB record, etc', email, password);

        const token = jwtService.generateToken({
            userId: Math.floor(Math.random() * 100) + 1,
            email: email,
            role: 'admin',
        });

        const accessTokenCookie = cookieService.createAccessTokenCookie(token);
        res.setHeader('Set-Cookie', [accessTokenCookie]);

        res.status(201).json({
            success: true,
            access_token: token,
        });
    } catch (error) {
        if (error instanceof ZodValidationError) {
            return res.status(400).json({
                success: false,
                ...error,
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
