import mongoose from "mongoose";
import env from "../env/env.js";

export const mongooseConnect = async () => {
  try {
    mongoose.connect(env.MONGODB_URL);
    console.info("Mongoose connection successful");
  } catch (error) {
    console.error(error);
  }
};
