import { Request, Response } from "express";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async updateCpf(req: Request, res: Response) {
    const { email } = req.params;
    const { cpf } = req.body;

   const { data, statusCode } = await this.userUseCase.updateCpf(email, cpf);

   res.status(statusCode).json(data);
  }
}
