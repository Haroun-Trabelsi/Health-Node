import * as Sentry from "@sentry/nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  try {
    // Ignore _next assets
    if (request.nextUrl.pathname.startsWith('/_next')) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api/health|_next/static|_next/image|favicon.ico).*)']
};

