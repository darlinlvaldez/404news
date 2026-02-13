const config = {
  MODE: process.env.MODE,
  PORT: process.env.PORT,
  PORTAL: process.env.PORTAL,

  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: Number(process.env.DB_PORT),
  REDIS_URL: process.env.REDIS_URL,
};

export default config;