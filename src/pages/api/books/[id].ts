// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/common';
import type { Book } from '@/entities/Book';
import { getBook } from '@/data/books';

export interface BookResponse extends ApiResponse {
    book?: Book;
}

interface QueryParams {
    id: string | string[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<BookResponse>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    const { id } = req.query as unknown as QueryParams;
    // Go to database and get books (no paging here)
    const book = getBook(+id);

    res.json({
        success: true,
        book,
    });
}
