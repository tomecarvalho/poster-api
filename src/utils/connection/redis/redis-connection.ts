import { createClient } from "redis";
import env from "../../../env/env.js";

const redisClient = createClient({ url: env.REDIS_URL });

redisClient.on("error", (error: any) => console.error(error));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.info("Redis connection successful");
  } catch (error: any) {
    console.error(error.message);
  }
};

connectRedis();

export default redisClient;
