import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "ro",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  },
);

export default function middleware(req: NextRequest) {
  // /[locale]/admin/*  private url pattern
  const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    // Apply Next-Intl middleware for public pages
    return intlMiddleware(req);
  } else {
    // Apply Next-Auth middleware for private pages
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Match only internationalized pathnames and exclude the api and _next
  matcher: ["/", "/(en|ro)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
