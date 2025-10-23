import type { NextApiRequest, NextApiResponse } from 'next';
import { loginSchema } from '@/shared/validation';
import { handleZodSchema, ZodValidationError } from '@/shared/errors';
import { jwtService } from '@/shared/jwt';
import { cookieService } from '@/shared/cookie';
import type { ApiResponse, ApiError } from '@/types/common';
import { User } from '@/entities/User';

export interface AuthLoginResponse extends ApiResponse, ApiError {
    user?: User;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthLoginResponse>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    try {
        const { email, password } = await handleZodSchema(
            loginSchema,
            req.body ?? {},
        );

        console.log('Create DB record, etc', email, password);

        const user = {
            userId: Math.floor(Math.random() * 100) + 1,
            email: email,
            role: 'admin',
        } as User;
        const token = jwtService.generateToken(user);

        const accessTokenCookie = cookieService.createAccessTokenCookie(token);
        res.setHeader('Set-Cookie', [accessTokenCookie]);

        res.status(201).json({
            success: true,
            user,
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
