import { logger } from "../../infraestructure/logger";
import { JWTTokenRepository, ResponseAuthVerification } from "../interfaces/JwtTokenRepository";

export class AuthVerificationUseCase {
  constructor(private jwtToken: JWTTokenRepository) {}
  isAuth(token: string): ResponseAuthVerification {
    if(!token) {
      logger.warn("Token não recebido");
      return {
        error: true,
        message: "Token must be required",
        isAuthenticate: false
      }
    }
    logger.info(token);
    return this.jwtToken.verifyToken(token);
  }
}