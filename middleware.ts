import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";

export async function middleware(request: NextRequest) {
  // Use the raw cookie header if needed by isLoggedIn.
  const cookiesString = request.headers.get("cookie") || "";
  const userLoggedIn = await isLoggedIn(cookiesString);
  const { pathname, origin } = request.nextUrl;

  const loggedOutOnlyPaths = ["/sign-in", "/"];

  // If the user is logged in and is trying to access a logged-out only page,
  // redirect them to /search.
  if (loggedOutOnlyPaths.includes(pathname)) {
    if (userLoggedIn) {
      return NextResponse.redirect(new URL("/search", origin));
    }
    return NextResponse.next();
  }

  // If the user is not logged in and is trying to access any other protected route,
  // redirect them to the homepage.
  if (!userLoggedIn) {
    return NextResponse.redirect(new URL("/", origin));
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
  runtime: "nodejs", // This forces the middleware to run using Node.js
};
