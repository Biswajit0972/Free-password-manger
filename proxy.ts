import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse} from 'next/server';

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up"]);
const isPrivateRoute = createRouteMatcher(["/password", "/settings", "/api"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();


  // ! if user is authenticated, also try to access sign-in or sign-up page, redirect to home or prevent them.

  if (userId && isPublicRoute(req)) {
    console.log("preventing authenticated user from accessing public route");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ! if user is  unauthenticated, not allow them to access private routes
  if (!userId && isPrivateRoute(req)) {
    console.log("not allowing authenticated user to access private route");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}
);

export const config = {

  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};