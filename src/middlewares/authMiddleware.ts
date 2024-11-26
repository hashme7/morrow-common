import { NextFunction, Request, Response } from "express";
import { JWTService } from "./../jwt/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("req",req);

  console.log("req.cookiess",req.cookies)

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.log("no authentication///,,")
     res.status(401).json({ message: "No token provided, unauthorized" });
     return;
  }

  const token = authHeader.split(" ")[1];  

  const decoded = JWTService.verifyToken(token) as { role:string,id:string};
  if (!decoded.id || !decoded.role) {
    console.log("invalied dfkasdjfkajskdjfkasjdkfjaksjd;f")
    res.status(401).json({ message: "Invalid token, unauthorized" });
  }
  // if (decoded) {
  //   res.status(403).json({ message: `Access denied  ${decoded}` })
  // }
  next();
};
