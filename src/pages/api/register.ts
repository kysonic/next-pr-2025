import type { NextApiRequest, NextApiResponse } from 'next';
import { registerSchema } from '@/shared/validation';
import { handleZodSchema, ZodValidationError } from '@/shared/errors';
import { jwtService } from '@/shared/jwt';
import { serialize } from 'cookie';
import { config } from '@/shared/config';

type Response = {
    success: boolean;
    message?: string;
    errors?: Record<string, { field: string; message: string }>;
    access_token?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>,
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
            userId: String(Math.floor(Math.random() * 100) + 1),
            email: email,
            role: 'admin',
        });

        const accessTokenCookie = serialize('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: config.auth.token.expiresIn,
            path: '/',
        });

        res.setHeader('Set-Cookie', [accessTokenCookie]);

        res.status(201).json({
            success: true,
            access_token: token,
        });
    } catch (error) {
        console.log(error);
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
