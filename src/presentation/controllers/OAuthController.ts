import { Request, Response } from "express";
import { JwtUseCase } from "../../domain/use-cases/JwtUseCase";
import { OAuthUseCase } from "../../domain/use-cases/OAuthUseCase";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";
import { logger } from "../../infraestructure/logger";

export class OAuthController {
  constructor(
    private oauthUseCase: OAuthUseCase,
    private userUseCase: UserUseCase,
    private jwtUseCase: JwtUseCase
  ) {}

  async signIn(req: Request, res: Response) {
    const { code } = req.body;

    if (!code) {
      logger.error(`Code não existe: ${code}`)
      res.status(403).json({ message: "Code is required" });
      return;
    }

    if(typeof code !== "string") {
      logger.error(`Code não é do tipo string: ${typeof code}`)
      res.status(400).json({ message: "Code must be a string" });
      return;
    }

    const response = await this.oauthUseCase.signIn(code);

    if (response.error) {
      logger.error(`Erro ao fazer login : ${response.message}`)
      res.status(400).json({ message: response.message });
      return;
    }

    if(!response.data) {
      logger.error(`Erro ao buscar dados do usuário : ${response.data}`)
      res.status(500).json({ message: "Ocorreu um erro ao buscar os dados" });
      return;
    }

    const userExists = await this.userUseCase.findByEmail(response.data.email);
    if(!userExists.error) {
      logger.info("Criando o token para usuário já existente");
      const token = this.jwtUseCase.createToken({ email: userExists.data?.email!, nome: userExists.data?.nome! });
      res.status(200).json({message: userExists.message, token});
      return;
    }

    const userCreated = await this.userUseCase.create(response.data);

    if(userCreated.error) {
      logger.error(`Erro ao criar o usuário: ${userCreated}`);
      res.status(500).json({message: "Erro ao criar o usuário"});
      return;
    }

    const token = this.jwtUseCase.createToken({ email: userCreated.data?.email!, nome: userCreated.data?.nome! });
    logger.info("Token criado para usuário adicionado");
    res.status(201).json({ message: "Usuário criado e autenticado com sucesso", token });
    return;
  }
}
