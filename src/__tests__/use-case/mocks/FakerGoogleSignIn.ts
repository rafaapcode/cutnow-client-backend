import { User } from "../../../domain/entities/User";
import { OAuthRepository, ReponseGoogleOAuth } from "../../../domain/interfaces/OAuthRepository";

type UserData = {
  error: boolean;
  data?: User;
  message: string;
};


export class FakerGoogleSignIn implements OAuthRepository {
  public googleDataUser = {
    picture: "https://avatarImage.com",
    email: "alanturingdoe@gmail.com",
    name: "Alan Turing",
    family_name: "Alan",
    given_nam: "Turing",
    verified_email: true
  }

  async signIn(code: string): Promise<ReponseGoogleOAuth> {
    const queryOptions = `code=${code}`;
    const accessToken = await this.getAccessToken(queryOptions);

    if (accessToken.error) {
      return {
        error: true,
        message: accessToken.message,
      };
    }

    const userData = await this.getUserData(accessToken.data);

    if (userData.error) {
      return {
        error: true,
        message: userData.message,
      };
    }
    const revokeToken = await this.revokeToken(accessToken.data);

    if (revokeToken.error) {
      return {
        error: true,
        message: revokeToken.message,
      };
    }
    return {
      error: false,
      message: "User recuperado com sucesso !",
      data: userData.data,
    };
  }

  private async revokeToken(token: string): Promise<ReponseGoogleOAuth> {
    return {
      error: false,
      message: "Token revoke with success !",
    };
  }

  private async getAccessToken(body: string): Promise<ReponseGoogleOAuth> {
    return {
      error: false,
      message: "Access token !",
      data: "accesstoken_123",
    };
  }

  private async getUserData(token: string): Promise<UserData> {
    if (!this.googleDataUser.verified_email) {
      return {
        error: true,
        message: "Por favor verifique sua conta com o GOOGLE",
      };
    }

    const user = this.mapUser(this.googleDataUser);

    return {
      error: false,
      message: "Usuário recuperado com sucesso",
      data: user,
    };
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