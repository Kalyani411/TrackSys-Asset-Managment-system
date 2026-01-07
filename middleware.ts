import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  // 1️⃣ Login page: redirect logged-in users by role
  if (pathname === "/login" && token) {
    if (token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/Dashboard", req.url));
    }
    if (token.role === "USER") {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  // 2️⃣ Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  // 3️⃣ Protect user routes
  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "USER") {
      return NextResponse.redirect(new URL("/admin/Dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/admin/:path*",
    "/user/:path*",
  ],
};
