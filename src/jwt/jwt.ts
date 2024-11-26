import { sign, verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class JWTService {
  static createAccessToken(id: string, role: string): string {
    try {
      const secretKey = process.env.JWT_SECRET;

      console.log(secretKey,"kasdjkfaksdfkaskdfkasdkfjasdf")
      if (!secretKey) throw new Error("No Secret Key for JSON WEB TOKEN");
      const payload = { id, role };
      return sign(payload, secretKey, { expiresIn: "24h" });
    } catch (error) {
      console.log(error);
      return "error on create acess token";
    }
  }

  static createRefreshToken(id: string, role: string): string {
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) throw new Error("No Secret Key for JSON WEB TOKEN");
      const payload = { id, role };
      return sign(payload, secretKey, { expiresIn: "7d" });
    } catch (error) {
      console.log(error);
      return "error on create refresh token";
    }
  }

  static verifyToken(token: string): JwtPayload | Error {
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) throw new Error("No Secret Key for JSON WEB TOKEN");
      return verify(token, secretKey) as JwtPayload;
    } catch (error: any) {
      console.error("Invalid token error:", error);
      throw error;
    }
  }
}
