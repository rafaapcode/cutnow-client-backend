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

    console.log("Controller: ", response.data);

    res.json({ message: "Certo" });
  }
}
