import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    cookies().delete("__Secure-next-auth.session-token");
    return Response.redirect(new URL("/", req.url));
  } catch (error: any) {
    return Response.json({ message: error.message });
  }
}
