import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { method, nextUrl } = request;
  const pathname = nextUrl.pathname;

  console.log(`[Middleware] ${method} request to: ${pathname}`);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/"],
};
