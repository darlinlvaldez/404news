import jwt from "jsonwebtoken";
import config from "@/config";

export function generateToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1h"
  });
}

export function verifyToken(token) {
  return jwt.verify(token, config.JWT_SECRET);
}