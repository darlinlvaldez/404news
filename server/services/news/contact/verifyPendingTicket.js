import getRedis from "@/server/lib/redis";
import { createTicket } from "@/server/models/news/contact";

export default async function verifyPendingTicket(token) {
  const redis = await getRedis();

  const key = `ticket:verify:${token}`;

  const pendingTicket = await redis.get(key);

  if (!pendingTicket) {
    throw new Error("El enlace de verificación es inválido o ha expirado.");
  }

  const data = JSON.parse(pendingTicket);

  const result = await createTicket(data);

  await redis.del(key);

  return result;
}
