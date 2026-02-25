import { verifyToken } from "@/server/utils/jwt";

export async function requireAuth(request, allowedRoles = []) {
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const payload = await verifyToken(token);

  if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
    throw new Error("FORBIDDEN");
  }

  return payload;
}