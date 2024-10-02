import { Request, Response } from "express";
import { ReponseUserRepository } from "../../domain/interfaces/UserRepository";
import { UserUseCase } from "../../use-cases/UserUseCase";
import { UserValidationSchema } from "../validations/UserValidations";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async findByEmail(req: Request, res: Response) {
    const { email } = req.body;

    if(!email) {
      const errorReponse: ReponseUserRepository = {
        error: true,
        message: "Email é obrigatório"
      }
      return res.json(errorReponse);
    }

    const response = await this.userUseCase.findByEmail(email);
    res.json(response);
  }

  async create(req: Request, res: Response) {
    const {success, data, error} = UserValidationSchema.safeParse(req.body);

    if(!success) {
      const errorReponse: ReponseUserRepository = {
        error: true,
        message: error.issues[0].message
      }
      return res.json(errorReponse);
    } 

    const response = await this.userUseCase.create(data);
    res.json(response);
  }

  async updateCpf(req: Request, res: Response) {
    const { email } = req.params;
    const { cpf } = req.body;

    if (!email || !cpf || cpf.length !== 11 ) {
      const errorReponse: ReponseUserRepository = {
        error: true,
        message: "Email e CPF são obrigatórios"
      }
      return res.json(errorReponse);
    }

    const response = await this.userUseCase.updateCpf(email, cpf);
    res.json(response);
  }
}
