// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/entities/User';
import type { Nullable } from '@/types/utils';
import type { ApiResponse } from '@/types/common';

export interface UserMeResponse extends ApiResponse {
    user?: Nullable<User | Error>;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserMeResponse>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    res.status(200).json({
        success: true,
        user: JSON.parse((req?.headers?.['x-user'] as string) ?? 'null'),
    });
}
