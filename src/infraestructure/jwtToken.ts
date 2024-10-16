import jwt from "jsonwebtoken";
import { JWTTokenRepository, PayloadTokenType, ResponseAuthVerification, ResponseToken } from "../domain/interfaces/JwtTokenRepository";

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
      console.log("Error CreateToken Method | JwtToken ", error.message);
      return {
        error: true,
        message: error.message
      }
    }
  }
  verifyToken(token: string): ResponseAuthVerification {
    try {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET!);

      if(!verifyToken) {
        return {
          error: true,
          message: "Token inválido",
          isAuthenticate: false
        }
      }

      return {
        error: false,
        message: "Usuário autenticado",
        isAuthenticate: true
      }

    } catch (error: any) {
      console.log("Error verifyToken Method | JwtToken ", error.message);
      return {
        error: true,
        message: error.message,
        isAuthenticate: false
      }
    }
  }
}