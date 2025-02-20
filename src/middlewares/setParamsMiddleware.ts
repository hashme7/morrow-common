import { NextFunction, Request, Response } from "express";
import { JWTService } from "../jwt/jwt";

export const modify = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies.accessToken
  const decodedAt = JWTService.verifyToken(cookies);
  if (decodedAt) {
    req.params.userId = decodedAt.id;
  }
  next(); 
};
