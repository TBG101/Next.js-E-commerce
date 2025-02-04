import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.redirect(new URL("/", request.url));
    const { role } = token;
    if (role != "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }
}


export const config = { matcher: ["/admin"] }