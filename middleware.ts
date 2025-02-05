import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) return;
  if (token.role === "admin") return;
  return NextResponse.redirect(new URL("/", request.url).toString());
}

export const config = { matcher: ["/admin"] };
