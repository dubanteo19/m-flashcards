import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const username = request.cookies.get('username')?.value;
    console.log((username))
    const { pathname } = request.nextUrl;

    // 1. Protect Dashboard: Redirect to login if cookie is missing
    if (pathname.startsWith('/dashboard') && !username) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. Prevent double login: Redirect to dashboard if already logged in
    if (pathname === '/login' && username) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Specify which routes the proxy should run on
export const config = {
    matcher: [
        '/dashboard/:path*', // Matches /dashboard/anything
        '/login'
    ],
};