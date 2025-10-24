// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiResponse } from '@/types/common';
import type { Book } from '@/entities/Book';
import { getBooks } from '@/data/books';

const METHODS = ['POST', 'GET'];

export interface CartResponse extends ApiResponse {
    id?: number;
    books?: Book[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<CartResponse>,
) {
    if (!METHODS.includes(req.method ?? '')) {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Only POST requests are allowed.',
        });
    }

    if (req.method === 'POST') {
        // Simple validation without zod
        if (!req.body.id) {
            return res.status(400).json({
                success: false,
                message: 'Please provide id to add in cart',
            });
        }
        // Imitate like we added a book to the cart
        return res.json({
            success: true,
            id: req.body.id,
        });
    }

    res.json({
        success: true,
        // Books in cart
        books: getBooks(2),
    });
}
