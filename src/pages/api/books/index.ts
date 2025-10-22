// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/entities/User';
import type { Nullable } from '@/types/utils';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Nullable<User>>,
) {
    res.status(200).json(
        JSON.parse((req?.headers?.['x-user'] as string) ?? 'null'),
    );
}
