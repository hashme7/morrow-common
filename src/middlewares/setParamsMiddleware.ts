import { NextFunction, Request, Response } from "express";
import { JWTService } from "../jwt/jwt";

export const modify = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie
    ? Object.fromEntries(
        req.headers.cookie.split("; ").map((c) => c.split("="))
      )
    : {};
  const decodedAt = JWTService.verifyToken(cookies.accessToken);
  if (decodedAt) {
    req.params.userId = decodedAt.id;
  }
  next(); 
};
