import { CookieOptions, NextFunction, Request, Response } from "express";
import env from "../env/env.js";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema.js";
import { createUser, findUser, signToken } from "../services/user.service.js";
import AppError from "../utils/error-handling/AppError.js";

// Exclude this fields from the response
export const excludedFields = ["password"];

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + env.ACCESS_TOKEN_EXPIRES_IN * 60 * 1e3),
  maxAge: env.ACCESS_TOKEN_EXPIRES_IN * 60 * 1e3,
  httpOnly: true,
  sameSite: "lax",
};

// Only set secure to true in production
if (process.env.NODE_ENV === "production") accessTokenCookieOptions.secure = true;

export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email });

    // Check if user exist and password is correct
    if (!user || !(await user.comparePasswords(user.password, req.body.password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Create an Access Token
    const { accessToken } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};
