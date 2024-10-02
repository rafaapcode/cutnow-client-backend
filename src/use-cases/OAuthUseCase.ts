import { OAuthRepository, ReponseGoogleOAuth } from "../domain/interfaces/OAuthRepository";

export class OAuthUseCase {
  constructor(private oauthRepository: OAuthRepository) {}

  async signIn(code: string): Promise<ReponseGoogleOAuth> {
    return this.oauthRepository.signIn(code);
  }

}