import { NextResponse } from "next/server";
import { loginAdmin } from "@/server/controllers/admin/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const token = await loginAdmin(username, password);

    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }
}