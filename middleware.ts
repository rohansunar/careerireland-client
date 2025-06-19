import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Only require authentication for protected routes
        const protectedRoutes = [
          "/profile",
          "/profile/application",
          "/api/user",
        ];
        
        // Check if the current path is a protected route
        const isProtectedRoute = protectedRoutes.some(route => 
          pathname.startsWith(route)
        );
        
        // If it's not a protected route, allow access
        if (!isProtectedRoute) {
          return true;
        }
        
        // For protected routes, require a valid token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
