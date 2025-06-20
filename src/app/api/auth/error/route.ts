import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");

  // Log the error for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.error("NextAuth error:", error);
  }

  // Map NextAuth errors to user-friendly messages
  let errorMessage = "Authentication failed. Please try again.";

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Incorrect email or password. Please try again.";
      break;
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
    case "Callback":
      errorMessage =
        "There was a problem with the authentication service. Please try again.";
      break;
    case "OAuthAccountNotLinked":
      errorMessage =
        "This account is already linked to another authentication method.";
      break;
    case "EmailSignin":
      errorMessage = "Unable to send verification email. Please try again.";
      break;
    case "SessionRequired":
      errorMessage = "Please sign in to access this page.";
      break;
    default:
      if (error) {
        errorMessage = error;
      }
      break;
  }

  // Redirect to login page with error parameter
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("error", errorMessage);

  return NextResponse.redirect(loginUrl);
}
