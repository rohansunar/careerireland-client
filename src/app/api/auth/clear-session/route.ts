import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Clear all NextAuth session cookies
    const cookiesToClear = [
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "next-auth.csrf-token",
      "__Host-next-auth.csrf-token",
      "next-auth.callback-url",
      "__Secure-next-auth.callback-url",
    ];
    
    cookiesToClear.forEach(cookieName => {
      try {
        cookieStore.delete(cookieName);
      } catch (error) {
        // Ignore errors for cookies that don't exist
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Session cookies cleared successfully" 
    });
  } catch (error) {
    console.error("Error clearing session cookies:", error);
    return NextResponse.json(
      { success: false, message: "Failed to clear session cookies" },
      { status: 500 }
    );
  }
}
