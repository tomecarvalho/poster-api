import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGODB_URL: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});

export default env;
