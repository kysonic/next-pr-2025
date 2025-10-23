import { NextResponse, NextRequest } from 'next/server';
import { jwtService } from '@/shared/jwt';
import { config as appConfig } from '@/shared/config';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;

    if (accessToken) {
        const response = NextResponse.next();
        const token = jwtService.decodeToken(accessToken);

        // Middleware works in different thread so Async Local Storage is not available (and Edge!!!)
        response.headers.set(
            'x-user',
            JSON.stringify({
                userId: token?.userId,
                email: token?.email,
                role: token?.role,
            }),
        );

        return response;
    } else {
        const path = new URL(request.url).pathname;

        if (appConfig.protectedRoutes.includes(path)) {
            // Api
            if (path.includes('/api')) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Forbidden Resource',
                    },
                    {
                        status: 403,
                    },
                );
            }
            // Pages
            else {
                return NextResponse.redirect('/login');
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
