import { NextResponse } from "next/server";
import { loginAdmin } from "@/server/controllers/admin/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const token = await loginAdmin(username, password);

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/"
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }
}