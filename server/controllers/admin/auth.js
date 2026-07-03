import bcrypt from "bcrypt";
import { findByUsername } from "@/server/models/admin/auth";
import { generateToken } from "@/server/utils/jwt";

export async function loginAdmin(username, password) {
  const user = await findByUsername(username);

  if (!user) {
    throw new Error("USER NOT FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("WRONG PASSWORD");
  }

  if (!user.active) {
    throw new Error("ACCOUNT BLOCKED");
  }

  const token = await generateToken({
    id: user.id,
    role: user.role,
  });

  return token;
}