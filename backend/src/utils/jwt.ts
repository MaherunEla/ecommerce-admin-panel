import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";
import { TokenPayload } from "../modules/auth/auth.types.js";

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN,
  } as SignOptions);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
};

export const verifyAccessToken = (token: string): TokenPayload | JwtPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload | JwtPayload;
};

export const verifyRefreshToken = (
  token: string,
): TokenPayload | JwtPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload | JwtPayload;
};
