import { NextResponse, NextRequest } from 'next/server';
import { jwtService } from './shared/jwt';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;

    if (accessToken) {
        const response = NextResponse.next();
        const token = jwtService.decodeToken(accessToken);

        response.headers.set(
            'x-user',
            JSON.stringify({
                userId: token?.userId,
                email: token?.email,
                role: token?.role,
            }),
        );

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
