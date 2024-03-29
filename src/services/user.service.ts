import pkg from "lodash";
const { omit } = pkg;
import { FilterQuery, QueryOptions } from "mongoose";
import userModel, { User } from "../models/user.model.js";
import { DocumentType } from "@typegoose/typegoose";
import { signJwt } from "../utils/jwt/jwt.js";
import redisClient from "../utils/connection/redis/redis-connection.js";
import { excludedFields } from "../controllers/auth.controller.js";
import env from "../env/env.js";

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async () => {
  return await userModel.find();
};

// Find one user by any fields
export const findUser = async (query: FilterQuery<User>, options: QueryOptions = {}) => {
  return await userModel.findOne(query, {}, options).select("+password");
};

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const accessToken = signJwt(
    { sub: user._id },
    {
      expiresIn: `${env.ACCESS_TOKEN_EXPIRES_IN}m`,
    }
  );

  // Create a Session
  redisClient.set(user._id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { accessToken };
};
