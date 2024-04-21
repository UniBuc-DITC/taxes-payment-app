import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "ro",
});

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

  // For all other pages, apply the `next-intl` middleware
  return intlMiddleware(req);
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
