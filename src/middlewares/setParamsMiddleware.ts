import { NextFunction, Request, Response } from "express";
import { JWTService } from "../jwt/jwt";

export const modify = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("JWT Verify:-",JWTService.verifyToken,req.cookies.accessToken)
    if (req.cookies.accessToken) {
      const accessToken = req.cookies.accessToken;
      const decodedAcsTkn = JWTService.verifyToken(accessToken);
      req.params.userId = decodedAcsTkn.id;
      next();
      return;
    }
    const cookies = req.headers.cookie
      ? Object.fromEntries(
          req.headers.cookie.split("; ").map((c) => c.split("="))
        )
      : {};
    if (cookies) {
      console.log("cookies from modify:", cookies);
      console.log("cookie:",cookies.accessToken, typeof cookies.accessToken, typeof cookies.refreshToken);
      
      const decodedAt = JWTService.verifyToken(cookies.accessToken);
      if (decodedAt) {
        req.params.userId = decodedAt.id;
      }
      next();
    } else {
      res.status(404).json({ cookies: cookies });
    }
  } catch (error) {
    console.log("error from modify:")
    res.status(500).json(error);
  }
  
};
