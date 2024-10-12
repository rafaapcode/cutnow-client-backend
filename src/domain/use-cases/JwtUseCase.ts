import {
  JWTTokenRepository,
  PayloadTokenType,
  ResponseAuthVerification,
  ResponseToken,
} from "../interfaces/JwtTokenRepository";

export class JwtUseCase {
  constructor(private jwtToken: JWTTokenRepository) {}

  createToken(payload: PayloadTokenType): ResponseToken {
    return this.jwtToken.createToken(payload);
  }

  verifyToken(token: string): ResponseAuthVerification {
    return this.jwtToken.verifyToken(token);
  }
}
