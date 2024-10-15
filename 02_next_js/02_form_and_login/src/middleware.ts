import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // get the token from the request ehader (JWT from cookies via NextAuth)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // get the current request pathname
  const { pathname } = req.nextUrl;

  // 1. if the request is for the root url
  if (pathname === "/" && token) {
    // if there is a token, redirect to the dashboard page
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  // 2. if there is a token, and we are on the session page, redirect to the dashboard page
  if (pathname === "/session" && token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  // 3. if the user is on the session page and has no token, do nothing (fixes the infinite redirect loop in step 4)
  if (pathname === "/session" && !token) {
    return NextResponse.next();
  }

  // 4. if there is no token, redirect to the session page (valid for all paths)
  if (!token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  // 5. continue with the request, if no other condition is met
  return NextResponse.next();
}

// Configuration to match all paths except API routes, static files, images, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
