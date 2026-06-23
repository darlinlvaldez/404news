import getRedis from "../lib/redis.js";
import config from "../../config.js";

export default async function getCountryByIP(ip) {
  const redis = await getRedis();

  if (ip === "::1" || ip === "127.0.0.1" || !ip) 
    { return null; }

  const cacheKey = `ip:country:${ip}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(
      `${config.IP_API_URL}/${ip}?fields=status,country,countryCode`
    );

    const data = await response.json();

    if (data.status !== "success") {
      return null;
    }

    const country = {
      code: data.countryCode,
      name: data.country,
    };

    await redis.set(cacheKey, JSON.stringify(country), {
      EX: 604800,
    });

    return country;
  } catch (error) {
    console.error(error);

    return null;
  }
}