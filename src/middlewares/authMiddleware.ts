import { NextFunction, Request, Response } from "express";
import { JWTService } from "./../jwt/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    const decodedAT = JWTService.verifyToken(accessToken);
    if (!decodedAT) {
      const refreshToken = req.cookies.refreshToken;
      const decodedRT = JWTService.verifyToken(refreshToken);
      if (decodedRT) {
        req.params.userId = decodedRT.id;
        next();
      } else {
        res.status(401).json({ message: "unathorised" });
      }
    } else {
      req.params.userId = decodedAT.id;
      next();
    }
  } catch (error) {
    res.status(500).json({message:error,})
  }
};

