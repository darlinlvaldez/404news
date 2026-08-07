import crypto from "crypto";
import getRedis from "@/server/lib/redis";
import sendVerificationEmail from "@/server/services/sendVerificationEmail";

const EXPIRES_IN = 60 * 60 * 24;

export default async function createPendingTicket(data) {
  try {
    const redis = await getRedis();

    const token = crypto.randomBytes(32).toString("hex");

    const key = `ticket:verify:${token}`;

    await redis.set(key, JSON.stringify(data), {
      EX: EXPIRES_IN,
    });

    await sendVerificationEmail({
      email: data.guestEmail,
      guestName: data.guestName,
      token,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error creando ticket pendiente:", error);
    throw error;
  }
}
