import { JWTTokenRepository, PayloadTokenType, ResponseAuthVerification, ResponseToken } from "../../../domain/interfaces/JwtTokenRepository";

export class FakerJwtToken implements JWTTokenRepository {
  createToken(payload: PayloadTokenType): ResponseToken {
    return {
      error: false,
      message: "Token Criado com sucesso !",
      token: "token123"
    }
  }
  
  verifyToken(token: string): ResponseAuthVerification {
    return {
      error: false,
      message: "Token validado com sucesso !",
      isAuthenticate: true
    }
  }
}