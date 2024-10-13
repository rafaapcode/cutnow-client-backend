import {
  HttpRequestResponse,
  HttRequestCreate,
  HttRequestDelete,
  IRequestAdapter,
} from "../../adapters/requestAdapter/IRequestAdapter";
import { RequestUseCase } from "../../domain/use-cases/RequestsUseCase";

export class RequestController implements IRequestAdapter {
  constructor(private requestUseCase: RequestUseCase) {}

  async create(req: HttRequestCreate): Promise<HttpRequestResponse> {
    try {
      const { error, message, statusCode } = await this.requestUseCase.create(
        req.body
      );
      return {
        statusCode,
        data: {
          error,
          message,
        },
      };
    } catch (error: any) {
      return {
        data: {
          error: true,
          message: error.message,
        },
        statusCode: 500,
      };
    }
  }
  async delete(req: HttRequestDelete): Promise<HttpRequestResponse> {
    try {
      const { id } = req.params;
      const { error, message, statusCode } = await this.requestUseCase.delete(
        id
      );

      return {
        statusCode,
        data: {
          error,
          message,
        },
      };
    } catch (error: any) {
      return {
        data: {
          error: true,
          message: error.message,
        },
        statusCode: 500,
      };
    }
  }
}
