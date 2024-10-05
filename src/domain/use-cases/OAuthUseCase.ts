import { User } from "@prisma/client";
import { OAuthRepository, ReponseGoogleOAuth } from "../interfaces/OAuthRepository";

export class OAuthUseCase {
  constructor(private oauthRepository: OAuthRepository) {}

  async signIn(code: string): Promise<Omit<ReponseGoogleOAuth, "data"> & { data?: User }> {
    return await this.oauthRepository.signIn(code);
  }

}