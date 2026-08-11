import { SignJWT, jwtVerify } from "jose";
import config from "@/config"

const secret = new TextEncoder().encode(config.JWT_SECRET);

export async function generateToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}