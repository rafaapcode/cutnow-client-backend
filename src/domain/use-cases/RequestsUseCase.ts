import { NewRequest } from "../entities/Requests";
import { RequestRepository } from "../interfaces/RequestsRepository";
import { IValidator } from "../interfaces/Validators";

export type ResponseRequestUseCase = {
  error: boolean;
  message: string;
  statusCode: number;
};

export class RequestUseCase {
  constructor(
    private requestRepository: RequestRepository,
    private validator: IValidator<NewRequest>
  ) {}

  async create(inputData: NewRequest): Promise<ResponseRequestUseCase> {
    try {
      const validateInput = this.validator.validate(inputData);
      if (validateInput.error) {
        return {
          error: true,
          message: validateInput.message || "Dados incorretos",
          statusCode: 406,
        };
      }

      return await this.requestRepository.create(inputData);
    } catch (error: any) {
      console.log("Error CreateRequest | Request UseCase", error.message);
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    }
  }

  async delete(id: string): Promise<ResponseRequestUseCase> {
    try {
      if(!id) {
        return {
          error: true,
          message: "Id is required",
          statusCode: 406
        }
      }

      return await this.requestRepository.delete(id);
    } catch (error: any) {
      console.log("Error DeleteRequest | Request UseCase", error.message);
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    }
  }
}
