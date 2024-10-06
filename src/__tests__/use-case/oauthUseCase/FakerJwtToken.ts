import { JWTTokenRepository, PayloadTokenType, ResponseToken } from "../../../domain/interfaces/JwtTokenRepository";

export class FakerJwtToken implements JWTTokenRepository {
  createToken(payload: PayloadTokenType): ResponseToken {
    return {
      error: false,
      message: "Token Criado com sucesso !",
      token: "token123"
    }
  }
  
}