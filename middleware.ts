import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";

export async function middleware(request: NextRequest) {
  const cookiesString = request.headers.get("cookie") || "";
  console.log("cookiesString", cookiesString);
  const isUserLoggedIn = await isLoggedIn(cookiesString);
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
