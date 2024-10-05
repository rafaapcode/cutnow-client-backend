import { Request, Response } from "express";
import { OAuthUseCase } from "../../domain/use-cases/OAuthUseCase";

export class OAuthController {
  constructor(private oauthUseCase: OAuthUseCase) {}

  async signIn(req: Request, res: Response) {
    const { code } = req.body;
    const { data, statusCode } = await this.oauthUseCase.signIn(code);
    res.status(statusCode).json(data);
  }
}
