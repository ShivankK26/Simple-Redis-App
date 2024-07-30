import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
    const userId = req.cookies.get('userId');

    const res = NextResponse.next();

    if (!userId) {
        res.cookies.set('userId', nanoid());
    }

    return res;
}

export const config = {
    matcher: [
        '/((?!api|_next_static|_next/image|favicon.ico).*)',
    ],
}