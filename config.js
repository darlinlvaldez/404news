const config = {
  MODE: process.env.MODE,
  PORT: process.env.PORT,
  PORTAL: process.env.PORTAL,

  JWT_SECRET: process.env.JWT_SECRET,
  
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: Number(process.env.DB_PORT),

  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  N8N_AI_WEBHOOK_URL: process.env.N8N_AI_WEBHOOK_URL,
  N8N_AI_SECRET: process.env.N8N_AI_SECRET,

  REDIS_URL: process.env.REDIS_URL,
  IP_API_URL: process.env.IP_API_URL,

  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
};

export default config;