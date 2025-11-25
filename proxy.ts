import { withSentry } from '@sentry/nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const handler = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const proxy = withSentry(handler);

export const config = {
  matcher: ['/((?!api/health|_next/static|_next/image|favicon.ico).*)']
};

