import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

export interface ApiResponse {
    success: boolean;
    message?: string;
    total?: number;
}

export interface ApiError {
    errors?: Record<string, { field: string; message: string }>;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export function ErrorGuard(err: unknown): err is Error {
    return err instanceof Error;
}
