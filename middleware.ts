import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("auth-token")?.value || "";

  const userLoggedIn = await isLoggedIn(authToken);

  if (pathname === "/" || pathname === "/sign-in") {
    return NextResponse.next();
  }

  if (!userLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/new",
    "/popular",
    "/search",
    "/add-restaurant",
    "/profile/:path*",
    "/restaurant/:path*",
  ],
};
