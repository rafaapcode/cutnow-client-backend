import { Request, Response } from "express";
import { OAuthUseCase } from "../../use-cases/OAuthUseCase";
import { UserUseCase } from "../../use-cases/UserUseCase";

export class OAuthController {
  constructor(
    private oauthUseCase: OAuthUseCase,
    private userUseCase: UserUseCase
  ) {}

  async signIn(req: Request, res: Response) {
    const { code } = req.body;

    if (!code) {
      res.status(403).json({ message: "Code is required" });
      return;
    }

    if(typeof code !== "string") {
      res.status(400).json({ message: "Code must be a string" });
      return;
    }

    const response = await this.oauthUseCase.signIn(code);

    if (response.error) {
      res.status(400).json({ message: response.message });
      return;
    }

    if(!response.data) {
      res.status(500).json({ message: "Ocorreu um erro ao buscar os dados" });
      return;
    }

    const userExists = await this.userUseCase.findByEmail(response.data.email);

    if(!userExists.error) {
      res.status(200).json({message: userExists.message});
      return;
    }

    const userCreated = await this.userUseCase.create(response.data);

    if(userCreated.error) {
      res.status(500).json({message: "Erro ao criar o usuário"});
      return;
    }

    res.status(201).json({ message: "Usuário criado e autenticado com sucesso" });
  }
}
