import { Axios } from "axios";
import { OAuthRepository, ReponseGoogleOAuth } from "../../domain/interfaces/OAuthRepository";

export class GoogleSignIn implements OAuthRepository {

  constructor(private fetcher: Axios){}

  async signIn(code: string): Promise<ReponseGoogleOAuth> {
    const queryOptions = `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`;

    
    throw new Error(" zthod not implemented.");
  }

  private async revoke(): Promise<ReponseGoogleOAuth> {
    return {
      error: false,
      message: "teste"
    }
  }
}