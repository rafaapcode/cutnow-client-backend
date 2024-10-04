import jwt from "jsonwebtoken";
import { JWTTokenRepository, PayloadTokenType, ResponseToken } from "../domain/interfaces/JwtTokenRepository";

export class JwtToken implements JWTTokenRepository {
  createToken(payload: PayloadTokenType): ResponseToken {
    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '1d'});
      return {
        error: false,
        message: "Token",
        token
      }
    } catch (error: any) {
      return {
        error: true,
        message: error.message
      }
    }
  }
  
}