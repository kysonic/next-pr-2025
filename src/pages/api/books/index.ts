// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/common';
import type { Book } from '@/entities/Book';

export interface BooksResponse extends ApiResponse {
    books?: Book[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<BooksResponse>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    res.end('books');
}
