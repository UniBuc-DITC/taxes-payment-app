import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token != null,
  },
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const pathname = req.nextUrl.pathname;

  const authRoutesPattern = "^/admin/auth/?.*?$";
  const authRoutesRegex = RegExp(authRoutesPattern);

  if (authRoutesRegex.test(pathname)) {
    return;
  }

  // Routes to be treated as admin pages
  const adminRoutesPattern = "^/admin/?.*?$";
  const adminRoutesRegex = RegExp(adminRoutesPattern, "i");

  if (adminRoutesRegex.test(pathname)) {
    // For the admin pages, only apply the NextAuth middleware
    return authMiddleware(req as NextRequestWithAuth, event);
  }

  // For localized pages, apply the `next-intl` middleware
  if (
    pathname == "/" ||
    routing.locales.some((locale) => pathname.startsWith(`/${locale}`))
  ) {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (internal Next.js routes)
     * - installHook.js.map (source map file)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next|installHook.js.map|favicon.ico).*)",
  ],
};
