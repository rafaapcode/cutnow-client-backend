import { Request, Response } from "express";
import { UserUseCase } from "../../use-cases/UserUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async findByEmail(req: Request, res: Response) {
    const { email } = req.body;
    const response = await this.userUseCase.findByEmail(email);
    res.json(response);
  }

  async create(req: Request, res: Response) {
    const response = await this.userUseCase.create(req.body);
    res.json(response);
  }

  async updateCpf(req: Request, res: Response) {
    const { email } = req.params;
    const { cpf } = req.body;
    const response = await this.userUseCase.updateCpf(email, cpf);

    res.json(response);
  }
}
