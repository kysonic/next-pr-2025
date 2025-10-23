// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/common';

export interface CheckoutResponse extends ApiResponse {
    id?: number;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CheckoutResponse>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    return res.json({
        success: true,
    });
}
