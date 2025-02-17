import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLoggedIn } from "./app/lib/AuthData";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const jsessionId = (await cookieStore).get("JSESSIONID")?.value || "";
  console.log("cookiesString", `:::${jsessionId}:::`);
  const isUserLoggedIn = await isLoggedIn(jsessionId);

  if (true) {
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
