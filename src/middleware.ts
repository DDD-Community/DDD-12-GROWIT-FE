import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 점검 기간 설정 (KST 기준)
const MAINTENANCE_START = new Date('2025-12-29T00:00:00+09:00');
const MAINTENANCE_END = new Date('2026-01-04T23:59:59+09:00');

const ALLOWED_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2'];
const ALLOWED_PATH_PREFIXES = ['/maintenance', '/api', '/_next', '/fonts', '/images'];
const ALLOWED_EXACT_PATHS = ['/'];

export function middleware(request: NextRequest) {
  const now = new Date();
  const isMaintenancePeriod = now >= MAINTENANCE_START && now <= MAINTENANCE_END;
  const pathname = request.nextUrl.pathname;

  // 정적 파일 확장자 체크
  const hasAllowedExtension = ALLOWED_EXTENSIONS.some(ext => pathname.endsWith(ext));
  if (hasAllowedExtension) {
    return NextResponse.next();
  }

  // 허용된 경로 체크 (prefix 또는 exact match)
  const isAllowedPath =
    ALLOWED_PATH_PREFIXES.some(path => pathname.startsWith(path)) || ALLOWED_EXACT_PATHS.includes(pathname);

  // 점검 기간이고, 허용된 경로가 아니면 점검 페이지로 리다이렉트
  if (isMaintenancePeriod && !isAllowedPath) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // 점검 기간이 아닌데 /maintenance 접근 시 홈으로 리다이렉트
  if (!isMaintenancePeriod && pathname === '/maintenance') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
