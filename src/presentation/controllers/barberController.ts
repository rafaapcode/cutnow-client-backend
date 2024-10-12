import {
  HttpGetAllRequest,
  HttpGetAllRequestsResponse,
  HttpGetAllSchedulesRequest,
  HttpGetAllSchedulesResponse,
  HttpGetBarberRequest,
  HttpGetBarberResponse,
  IBarberAdapter,
} from "../../adapters/barberAdapter/IBarberAdapter";
import { BarberUseCase } from "../../domain/use-cases/BarberUseCase";

export class BarberController implements IBarberAdapter {
  constructor(private barberUseCase: BarberUseCase) {}

  async getBarber(req: HttpGetBarberRequest): Promise<HttpGetBarberResponse> {
    const { id } = req.params;
    const { data, statusCode } = await this.barberUseCase.getBarber(id);
    return {
      statusCode,
      data: {
        error: data.error,
        barber: data.barber,
      },
    };
  }
  async getAllSchedules(
    req: HttpGetAllSchedulesRequest
  ): Promise<HttpGetAllSchedulesResponse> {
    const { id, data } = req.query;
    return await this.barberUseCase.getAllSchedules(id, data);
  }
  async getAllRequests(
    req: HttpGetAllRequest
  ): Promise<HttpGetAllRequestsResponse> {
    const { id } = req.params;
    return await this.barberUseCase.getAllRequests(id);
  }
}
