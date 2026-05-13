import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["en", "vi"],
    defaultLocale: "vi",
    localeDetection: false
});

export default function proxy(request: NextRequest) {
    const response = intlMiddleware(request);
    const username = request.cookies.get("username")?.value;
    const pathname = request.nextUrl.pathname;

    const segments = pathname.split("/");
    const maybeLocale = segments[1];

    const locale = ["en", "vi"].includes(maybeLocale)
        ? maybeLocale
        : "vi";

    const pathnameWithoutLocale = pathname.replace(
        /^\/(en|vi)/,
        ""
    );

    if (
        pathnameWithoutLocale.startsWith("/dashboard") &&
        !username
    ) {
        return NextResponse.redirect(
            new URL(`/${locale}/login`, request.url)
        );
    }

    if (
        pathnameWithoutLocale === "/login" &&
        username
    ) {
        return NextResponse.redirect(
            new URL(`/${locale}/dashboard`, request.url)
        );
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"]
};