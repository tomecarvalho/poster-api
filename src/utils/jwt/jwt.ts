import jwt, { SignOptions } from "jsonwebtoken";
import env from "../../env/env.js";

const keyToAscii = (key: string) => Buffer.from(key, "base64").toString("ascii");

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = keyToAscii(env.ACCESS_TOKEN_PRIVATE_KEY);

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = keyToAscii(env.ACCESS_TOKEN_PUBLIC_KEY);

    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
