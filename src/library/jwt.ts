import { sign, verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET ;

function createAccessToken(id: string, role: string): string {
  try {
    if(!secretKey)throw new Error("No Secret Key for JSON WEB TOKEN");
    const payload = { id, role };
    return sign(payload, secretKey, { expiresIn: "24h" });
  } catch (error) {
    console.log(error);
    return "error on create acess token";
  }
}

function createRefreshToken(id: string, role: string): string {
  try {
    if(!secretKey)throw new Error("No Secret Key for JSON WEB TOKEN");
    const payload = { id, role };
    return sign(payload, secretKey, { expiresIn: "7d" });
  } catch (error) {
    console.log(error);
    return "error on create refresh token";
  }
}

function verifyToken(token: string): JwtPayload | null {
  try {
    if(!secretKey)throw new Error("No Secret Key for JSON WEB TOKEN");
    return verify(token, secretKey) as JwtPayload;
  } catch (error: any) {
    console.error("Invalid token error:", error);
    return null;
  }
}
export const jwt = {
    createAccessToken,
    createRefreshToken,
    verifyToken
} ;
