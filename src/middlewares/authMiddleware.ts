import { NextFunction, Request, Response } from "express";
import { JWTService } from "./../jwt/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = JWTService.verifyToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Invalid token, unauthorized" });
    return ;
  }
  if (decoded) {
    res.status(403).json({ message: `Access denied  ${decoded}` })
    return;
  }
  next();
};
