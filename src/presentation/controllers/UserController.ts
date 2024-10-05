import { Request, Response } from "express";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async updateCpf(req: Request, res: Response) {
    const { email } = req.params;
    const { cpf } = req.body;

    if (!email || !cpf) {
      res.status(400).json({ message: "Email e CPF são obrigatórios." });
      return;
    }

    const updateCpf = await this.userUseCase.updateCpf(email, cpf);
    if (updateCpf.error) {
      res.status(400).json({ message: updateCpf.message });
      return;
    }

    res.status(200).json({ message: "CPF atualizado com sucesso !" });
  }
}
