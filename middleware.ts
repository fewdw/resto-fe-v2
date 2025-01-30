import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";

export async function middleware(request: NextRequest) {
  const cookiesString = request.headers.get("cookie") || "";
  const isUserLoggedIn = await isLoggedIn(cookiesString);
  const { pathname } = request.nextUrl;

  const loggedOutOnlyPaths = ["/sign-in", "/"];
  if (loggedOutOnlyPaths.includes(pathname)) {
    if (isUserLoggedIn) {
      return NextResponse.redirect(new URL("/search", request.url));
    }
    return NextResponse.next();
  }

  if (!isUserLoggedIn) {
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
    "/sign-in",
    "/",
  ],
};
