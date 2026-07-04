import bcrypt from "bcrypt";
import { findByUsername } from "@/server/models/admin/auth";
import { generateToken } from "@/server/utils/jwt";
import { ApiError } from "../../errors/apiError"
import { ERROR_MESSAGES } from "../../utils/errors"

export async function loginAdmin(username, password) {
  const user = await findByUsername(username);

  if (!user) {
      throw new ApiError(
      401,
      "username",
      ERROR_MESSAGES.USER_NOT_FOUND
    );
  };

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
      throw new ApiError(
      401,
      "password",
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }

  if (!user.active) { 
      throw new ApiError(
      403,
      "username",
      ERROR_MESSAGES.ACCOUNT_BLOCKED
    );
  }

  const token = await generateToken({
    id: user.id,
    role: user.role,
  });

  return token;
}