import { cookies } from "next/headers";
import { verifyToken } from "@/server/utils/jwt";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);
    return Response.json({ user });
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}