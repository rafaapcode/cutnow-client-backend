import {
  HttpRequestUser,
  HttpRequestUserSchedules,
  HttpResponseUser,
  HttpResponseUserSchedules,
  IUserAdapter,
} from "../../adapters/userAdapter/IUserAdapter";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";

export class UserController implements IUserAdapter {
  constructor(private userUseCase: UserUseCase) {}
  async updateCpf(req: HttpRequestUser): Promise<HttpResponseUser> {
    const { email } = req.params;
    const { cpf } = req.data;

    const { data, statusCode } = await this.userUseCase.updateCpf(email, cpf);
    return {
      body: data,
      statusCode,
    };
  }

  async getAllSchedules(req: HttpRequestUserSchedules): Promise<HttpResponseUserSchedules> {
    const {email} = req.params;
    const {data, statusCode} = await this.userUseCase.getAllSchedules(email);

    return {
      statusCode,
      body: data
    }
  }
}
