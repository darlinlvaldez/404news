import { NextResponse } from "next/server";
import { admin } from "@/server/middlewares/admin";
import { visitor } from "@/server/middlewares/visitor";

export async function proxy(req) {

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    return admin(req);
  }

  if (pathname.startsWith("/news")) {
    return visitor(req);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/news/:path*"
  ],
};