import dotenv from "dotenv";
import { cleanEnv, str, port, num } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGODB_URL: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
  ACCESS_TOKEN_PRIVATE_KEY: str(),
  ACCESS_TOKEN_PUBLIC_KEY: str(),
  ACCESS_TOKEN_EXPIRES_IN: num(),
  REDIS_URL: str(),
});

export default env;
