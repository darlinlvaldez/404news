import { cookies } from "next/headers";
import { verifyToken } from "@/server/utils/jwt";

export async function requirePageAuth(allowedRoles = []) {
  const cookieStore = await cookies();

  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const payload = await verifyToken(token);

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(payload.role)
  ) {
    throw new Error("FORBIDDEN");
  }

  return payload;
}