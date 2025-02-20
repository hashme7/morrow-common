import { NextFunction, Request, Response } from "express";
import { JWTService } from "../jwt/jwt";

export const modify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.headers.cookie
      ? Object.fromEntries(
          req.headers.cookie.split("; ").map((c) => c.split("="))
        )
      : {};
    if (cookies) {
      console.log("cookies from modify:", cookies);
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
