import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { NextRequest } from "next/server";
// import acceptLanguage from 'accept-language'

// acceptLanguage.languages(languages);

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)"
};

// import { NextResponse } from "next/server";
// import acceptLanguage from "accept-language";
// import { fallbackLng, languages, cookieName } from "./app/utils/i18n-settings";

// acceptLanguage.languages(languages);

// export const config = {
//   // matcher: '/:lng*'
//   matcher: [
//     "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)"
//   ]
// };

// export function middleware(req) {
//   let lng;
//   if (req.cookies.has(cookieName))
//     lng = acceptLanguage.get(req.cookies.get(cookieName).value);
//   if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
//   if (!lng) lng = fallbackLng;

//   // Redirect if lng in path is not supported
//   if (
//     !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//     !req.nextUrl.pathname.startsWith("/_next")
//   ) {
//     return NextResponse.redirect(
//       new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
//     );
//   }

//   if (req.headers.has("referer")) {
//     const refererUrl = new URL(req.headers.get("referer"));
//     const lngInReferer = languages.find((l) =>
//       refererUrl.pathname.startsWith(`/${l}`)
//     );
//     const response = NextResponse.next();
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
//     return response;
//   }

//   return NextResponse.next();
// }

// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en", "ru", "be"],

//   // Used when no locale matches
//   defaultLocale: "en"
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ["/", "/(ru|en|be)/:path*"]
// };
