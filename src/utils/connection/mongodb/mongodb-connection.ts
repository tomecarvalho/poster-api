import mongoose from "mongoose";
import env from "../../../env/env.js";

export const connectMongoDb = async () => {
  try {
    mongoose.connect(env.MONGODB_URL);
    console.info("Mongoose connection successful");
  } catch (error: any) {
    console.error(error);
  }
};
