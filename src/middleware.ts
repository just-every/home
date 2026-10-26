import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://static.ads-twitter.com;
    connect-src 'self' https://analytics.twitter.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    media-src 'self' blob: data: https:;
    font-src 'self';
    frame-src https://www.youtube-nocookie.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\n/g, '');

function withSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('Content-Security-Policy', cspHeader);
  return response;
}

export function middleware(_request: NextRequest) {
  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
