import { OAuthRepository } from "../interfaces/OAuthRepository";
import { JwtUseCase } from "./JwtUseCase";
import { UserUseCase } from "./UserUseCase";

export type OauthUseCaseResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    token?: string | undefined;
    user?: {
      avatar: string;
      email: string;
      nome: string;
      id: string;
    }
  };
};

export class OAuthUseCase {
  constructor(
    private oauthRepository: OAuthRepository,
    private userUseCase: UserUseCase,
    private jwtUseCase: JwtUseCase
  ) {}

  async signIn(code: string): Promise<OauthUseCaseResponse> {
    try {
      if (!code) {
        return {
          statusCode: 403,
          data: {
            error: true,
            message: "Code is required",
            user: undefined
          },
        };
      }

      if (typeof code !== "string") {
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "Code must be a string",
            user: undefined
          },
        };
      }

      const response = await this.oauthRepository.signIn(code);

      if (response.error) {
        return {
          statusCode: 400,
          data: {
            error: true,
            message: response.message,
            user: undefined
          },
        };
      }

      if (!response.data) {
        return {
          statusCode: 500,
          data: {
            error: true,
            message: "Ocorreu um erro ao buscar os dados",
            user: undefined
          },
        };
      }

      const userExists = await this.userUseCase.findByEmail(
        response.data.email
      );
      if (!userExists.error) {
        const token = this.jwtUseCase.createToken({
          email: userExists.data?.email!,
          nome: userExists.data?.nome!,
        });
        return {
          statusCode: 200,
          data: {
            error: false,
            message: userExists.message,
            token: token.token,
            user: {
              avatar: userExists.data?.avatar!,
              email: userExists.data?.email!,
              nome: userExists.data?.nome!,
              id: userExists.data?.id!
            }
          },
        };
      }

      const userCreated = await this.userUseCase.create(response.data);

      if (userCreated.error) {
        return {
          statusCode: 500,
          data: {
            error: true,
            message: "Erro ao criar o usuário",
            user: undefined
          },
        };
      }

      const token = this.jwtUseCase.createToken({
        email: userCreated.data?.email!,
        nome: userCreated.data?.nome!,
      });
      return {
        statusCode: 201,
        data: {
          error: false,
          message: "Usuário criado e autenticado com sucesso",
          token: token.token,
          user: {
            avatar: userCreated.data?.avatar!,
            email: userCreated.data?.email!,
            nome: userCreated.data?.nome!,
            id: userCreated.data?.id!
          } 
        },
      };
    } catch (error: any) {
      console.log("Erro SignIn Method | Oauth UseCase", error.message);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
          user: undefined
        },
      };
    }
  }
}
