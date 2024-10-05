import { logger } from "../../infraestructure/logger";
import { OAuthRepository } from "../interfaces/OAuthRepository";
import { JwtUseCase } from "./JwtUseCase";
import { UserUseCase } from "./UserUseCase";

export type OauthUseCaseResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    token?: string | undefined;
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
        logger.error(`Code não existe: ${code}`);
        return {
          statusCode: 403,
          data: {
            error: true,
            message: "Code is required",
          },
        };
      }

      if (typeof code !== "string") {
        logger.error(`Code não é do tipo string: ${typeof code}`);
        return {
          statusCode: 400,
          data: {
            error: true,
            message: "Code must be a string",
          },
        };
      }

      const response = await this.oauthRepository.signIn(code);

      if (response.error) {
        logger.error(`Erro ao fazer login : ${response.message}`);
        return {
          statusCode: 400,
          data: {
            error: true,
            message: response.message,
          },
        };
      }

      if (!response.data) {
        logger.error(`Erro ao buscar dados do usuário : ${response.data}`);
        return {
          statusCode: 500,
          data: {
            error: true,
            message: "Ocorreu um erro ao buscar os dados",
          },
        };
      }

      const userExists = await this.userUseCase.findByEmail(
        response.data.email
      );
      if (!userExists.error) {
        logger.info("Criando o token para usuário já existente");
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
          },
        };
      }

      const userCreated = await this.userUseCase.create(response.data);

      if (userCreated.error) {
        logger.error(`Erro ao criar o usuário: ${userCreated}`);
        return {
          statusCode: 500,
          data: {
            error: true,
            message: "Erro ao criar o usuário",
          },
        };
      }

      const token = this.jwtUseCase.createToken({
        email: userCreated.data?.email!,
        nome: userCreated.data?.nome!,
      });
      logger.info("Token criado para usuário adicionado");
      return {
        statusCode: 201,
        data: {
          error: false,
          message: "Usuário criado e autenticado com sucesso",
          token: token.token,
        },
      };
    } catch (error: any) {
      logger.error(error);
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message,
        },
      };
    }
  }
}
