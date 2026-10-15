import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  ASSIGNMENT_MAX_AGE,
  HERO_COOKIE,
  HERO_PARAM,
  HERO_ROUTE,
  VISITOR_COOKIE,
  isAssignable,
  isHeroVariant,
  isVisitorId,
  pickVariant,
} from '@/lib/hero-ab';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://static.ads-twitter.com;
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

/** Uniform in [0, 1), from the Web Crypto generator. */
function randomUnit(): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
}

/**
 * `/` is served from the static page of the visitor's hero variant
 * (src/lib/hero-ab.ts). A visitor without a valid assignment (no cookie, or a
 * variant no longer in the split) is assigned one by weight with a fresh
 * visitor id, both kept for 30 days. `?hero=<id>` shows that variant instead,
 * for a preview; the assignment is still made or kept as usual.
 */
function heroResponse(request: NextRequest): NextResponse {
  const assigned = request.cookies.get(HERO_COOKIE)?.value;
  const visitor = request.cookies.get(VISITOR_COOKIE)?.value;
  const kept = isAssignable(assigned) && isVisitorId(visitor) ? assigned : null;
  const variant = kept ?? pickVariant(randomUnit());
  const forced = request.nextUrl.searchParams.get(HERO_PARAM);

  const url = request.nextUrl.clone();
  url.pathname = `${HERO_ROUTE}/${isHeroVariant(forced) ? forced : variant}`;
  const response = NextResponse.rewrite(url);

  if (!kept) {
    const cookie = {
      path: '/',
      maxAge: ASSIGNMENT_MAX_AGE,
      sameSite: 'lax',
      secure: true,
    } as const;
    response.cookies.set(HERO_COOKIE, variant, cookie);
    response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
      ...cookie,
      httpOnly: true,
    });
  }
  // The page differs by cookie: browsers revalidate it, and no shared cache
  // may keep one visitor's hero for another. These replace the static page's
  // own headers, so Vary restates the router headers Next.js varies on.
  response.headers.set('Cache-Control', 'private, no-cache');
  response.headers.set(
    'Vary',
    'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Cookie'
  );
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/') return withSecurityHeaders(heroResponse(request));
  // The variant pages exist only behind `/`.
  if (pathname === HERO_ROUTE || pathname.startsWith(`${HERO_ROUTE}/`)) {
    return withSecurityHeaders(
      NextResponse.rewrite(new URL('/404', request.url), { status: 404 })
    );
  }
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
