import { verifyToken } from "@/server/utils/jwt";

export function requireAdmin(req) {
  const token = req.cookies.get("admin_token")?.value;

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const decoded = verifyToken(token);

  return decoded;
}