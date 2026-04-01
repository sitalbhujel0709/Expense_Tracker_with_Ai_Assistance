import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // If we have a valid access token, just continue
  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY!);
      return NextResponse.next();
    } catch (err) {
      // Access token is invalid (expired). Attempt refresh.
    }
  }

  // No valid access token – try to refresh using the refresh token
  if (refreshToken) {
    try {
      // Call your backend refresh endpoint (must be on the same domain or CORS configured)
      const refreshRes = await fetch(`${process.env.API_BASE_URL_INTERNAL}/users/refresh`, {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`, // Send refresh token as cookie
        },
        // Note: in Next.js middleware, you need to manually forward cookies.
        // A simpler approach: call your internal API route that proxies to the backend.
      });

      if (refreshRes.ok) {
        // The backend should have set new cookies (accessToken, refreshToken) in the response.
        // Extract the `Set-Cookie` headers and combine them with the current response.
        const response = NextResponse.next();
        const setCookieHeader = refreshRes.headers.get("set-cookie");
        if (setCookieHeader) {
          response.headers.set("Set-Cookie", setCookieHeader);
        }
        return response;
      }
    } catch (error) {
      console.error("Refresh failed in middleware:", error);
    }
  }

  // If we get here, refresh failed or no refresh token – redirect to login
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/",     
    "/transactions"      // protect the homepage
  ],
};