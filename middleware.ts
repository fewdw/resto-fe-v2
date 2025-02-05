import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get your cookie value. Replace "auth-token" with your actual cookie name.
  const authToken = request.cookies.get("auth-token")?.value || "";

  // Ensure that isLoggedIn is using this cookie string (or token) correctly.
  const userLoggedIn = await isLoggedIn(authToken);

  const loggedOutOnlyPaths = ["/sign-in", "/"];

  if (loggedOutOnlyPaths.includes(pathname)) {
    if (userLoggedIn) {
      return NextResponse.redirect(new URL("/search", request.url));
    }
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
    "/sign-in",
    "/",
  ],
};
