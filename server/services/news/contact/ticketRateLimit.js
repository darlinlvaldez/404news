import getRedis from "@/server/lib/redis";
import { ApiError } from "@/server/errors/apiError";

const COOLDOWN_SECONDS = 120;
const IP_WINDOW_SECONDS = 60 * 10;
const IP_MAX_REQUESTS = 5;

export async function checkTicketRateLimit({ ip, visitorId }) {
  const redis = await getRedis();

  const visitorKey = `ticket:cooldown:visitor:${visitorId}`;
  const ipKey = `ticket:rate:ip:${ip}`;

  const visitorExists = await redis.exists(visitorKey);

  if (visitorExists) {
    const retryAfter = await redis.ttl(visitorKey);

    throw new ApiError(
      429,
      null,
      "Debes esperar antes de enviar otra solicitud.",
      {
        retryAfter,
      }
    );
  }

  const currentIpCount = await redis.get(ipKey);

  if (
    currentIpCount &&
    Number(currentIpCount) >= IP_MAX_REQUESTS
  ) {
    const retryAfter = await redis.ttl(ipKey);

    throw new ApiError(
      429,
      null,
      "Has enviado demasiadas solicitudes. Intenta nuevamente más tarde.",
      {
        retryAfter,
      }
    );
  }

  const cooldownCreated = await redis.set(
    visitorKey,
    "1",
    {
      NX: true,
      EX: COOLDOWN_SECONDS,
    }
  );

  if (!cooldownCreated) {
    const retryAfter = await redis.ttl(visitorKey);

    throw new ApiError(
      429,
      null,
      "Debes esperar antes de enviar otra solicitud.",
      {
        retryAfter,
      }
    );
  }

  const ipCount = await redis.incr(ipKey);

  if (ipCount === 1) {
    await redis.expire(
      ipKey,
      IP_WINDOW_SECONDS
    );
  }

  return true;
}