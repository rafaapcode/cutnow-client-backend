import { Axios } from "axios";
import { User } from "../../domain/entities/User";
import {
  OAuthRepository,
  ReponseGoogleOAuth,
} from "../../domain/interfaces/OAuthRepository";
import { logger } from "../logger";

type UserData = {
  error: boolean;
  data?: User;
  message: string;
};

export class GoogleSignIn implements OAuthRepository {
  constructor(private fetcher: Axios) {}

  async signIn(
    code: string
  ): Promise<Omit<ReponseGoogleOAuth, "data"> & { data?: User }> {
    const queryOptions = `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`;
    const accessToken = await this.getAccessToken(queryOptions);

    if (accessToken.error) {
      logger.error(`Access Token: ${accessToken}`);
      return {
        error: true,
        message: accessToken.message,
      };
    }

    const userData = await this.getUserData(accessToken.data);

    if (userData.error) {
      logger.error(`UseData Token: ${userData}`);
      return {
        error: true,
        message: userData.message,
      };
    }
    const revokeToken = await this.revokeToken(accessToken.data);

    if (revokeToken.error) {
      logger.error(`Revoke Token: ${revokeToken}`);
      return {
        error: true,
        message: revokeToken.message,
      };
    }

    logger.info("Success to retrieve the user.");
    return {
      error: false,
      message: "User recuperado com sucesso !",
      data: userData.data,
    };
  }

  private async revokeToken(token: string): Promise<ReponseGoogleOAuth> {
    try {
      const { data } = await this.fetcher.post(
        "https://oauth2.googleapis.com/revoke",
        `token=${token}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      logger.info("Token revoke with success");
      return {
        error: false,
        message: "Token revoke with success !",
        data: data,
      };
    } catch (error: any) {
      logger.error(`Revoke error Data: `, error.response.data)
      logger.error(`Revoke error Status: `, error.response.status)
      logger.error(`Revoke error Headers: `, error.response.headers)
      return {
        error: true,
        message: "Erro ao buscar o access token",
      };
    }
  }

  private async getAccessToken(body: string): Promise<ReponseGoogleOAuth> {
    try {
      const { data } = await this.fetcher.post(
        "https://oauth2.googleapis.com/token",
        body,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      logger.info("Token recuperado com sucesso !");
      return {
        error: false,
        message: "Access token !",
        data: data.access_token,
      };
    } catch (error: any) {
      logger.error(`GetAccessToken error Data: `, error.response.data)
      logger.error(`GetAccessToken error Status: `, error.response.status)
      logger.error(`GetAccessToken error Headers: `, error.response.headers)
      return {
        error: true,
        message: "Erro ao buscar o access token",
      };
    }
  }

  private async getUserData(token: string): Promise<UserData> {
    try {
      const { data } = await this.fetcher.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.verified_email) {
        logger.info("Not verified the email");
        return {
          error: true,
          message: "Por favor verifique sua conta com o GOOGLE",
        };
      }

      const user = this.mapUser(data);

      logger.info("User recuperado com sucesso !");
      return {
        error: false,
        message: "Usuário recuperado com sucesso",
        data: user,
      };
    } catch (error: any) {
      logger.error(`getUserData error Data: `, error.response.data)
      logger.error(`getUserData error Status: `, error.response.status)
      logger.error(`getUserData error Headers: `, error.response.headers)
      return {
        error: true,
        message: "Erro ao buscar o access token",
      };
    }
  }

  private mapUser(data: any): User {
    const user: User = {
      avatar: data.picture,
      email: data.email,
      nome: data.name,
      sobreNome: data.family_name,
      primeiroNome: data.given_name,
    };

    return user;
  }
}
