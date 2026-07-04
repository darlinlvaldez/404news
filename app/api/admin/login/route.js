import { NextResponse } from "next/server";
import { loginAdmin } from "../../../../server/controllers/admin/auth";
import { handleError } from "../../../../server/utils/handleError";
import { loginSchema } from "../../../../server/schemas/admin/auth"

export async function POST(req) {
  try {
    const body = await req.json();

    const { username, password } = loginSchema.parse(body);

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
    console.log(error);
    return handleError(error);
}
}