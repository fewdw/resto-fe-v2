import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";

export async function middleware(request: NextRequest) {
  const isUserLoggedIn = await isLoggedIn(request.headers.get("cookie") || "");
  if (isUserLoggedIn) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
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
