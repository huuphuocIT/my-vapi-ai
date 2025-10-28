import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicPage = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/hello-rsc(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicPage(request)) {
    await auth.protect();
  }

  if (request.nextUrl.pathname === "/config") {
    return NextResponse.redirect(new URL("/config/widget", request.url), 308);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
