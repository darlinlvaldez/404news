import { verifyToken } from "@/server/utils/jwt";
import { NextResponse } from "next/server";

export async function admin(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const payload = await verifyToken(token);

    const { role } = payload;

    if (pathname.startsWith("/admin/users") && role !== "superadmin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    if (pathname.startsWith("/admin/settings") && role !== "superadmin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();

  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}