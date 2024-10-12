import { JWTTokenRepository, ResponseAuthVerification } from "../interfaces/JwtTokenRepository";

export class AuthVerificationUseCase {
  constructor(private jwtToken: JWTTokenRepository) {}
  isAuth(token: string): ResponseAuthVerification {
    return this.jwtToken.verifyToken(token);
  }
}