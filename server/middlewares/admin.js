import { verifyToken } from "@/server/utils/jwt";
import { NextResponse } from "next/server";

export async function admin(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;

  if (pathname === "/admin/login") {
    
    if (!token) {
      return NextResponse.next();
    }

    try {
      await verifyToken(token);

      return NextResponse.redirect( new URL("/admin/dashboard", req.url));

    } catch {
      return NextResponse.next();
    }
  }

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