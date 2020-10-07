import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const { secret } = authConfig.jwt;

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
};
