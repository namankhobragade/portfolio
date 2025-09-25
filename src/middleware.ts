// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const STUDIO_PASSWORD_COOKIE = 'devsec_studio_pass';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for the studio login page, let it through.
  if (pathname.startsWith('/studio/login')) {
    return NextResponse.next();
  }

  // If the request is for any other studio page, check for the password cookie.
  if (pathname.startsWith('/studio')) {
    const passwordCookie = request.cookies.get(STUDIO_PASSWORD_COOKIE);
    
    // Replace 'your_cookie_value' with the expected value. Here we just check for presence.
    if (passwordCookie?.value !== process.env.STUDIO_PASSWORD_COOKIE_VALUE) {
      // If the cookie is not present or invalid, redirect to the login page.
      const url = request.nextUrl.clone();
      url.pathname = '/studio/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all studio routes except for assets and the login page itself.
  matcher: ['/studio/:path*'],
};
