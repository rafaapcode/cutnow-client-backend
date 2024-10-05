import {
  JWTTokenRepository,
  PayloadTokenType,
  ResponseToken,
} from "../interfaces/JwtTokenRepository";

export class JwtUseCase {
  constructor(private jwtToken: JWTTokenRepository) {}

  createToken(payload: PayloadTokenType): ResponseToken {
    return this.jwtToken.createToken(payload);
  }
}
