import {
  HttpAllBarberShopsRes,
  HttpBarberShopRes,
  HttpBarbersRes,
  HttpBaseResponse,
  HttpRequestParams,
  HttpRequestQueryParams,
  HttpSchedulesRes,
  IBarbershopAdapter,
} from "../../adapters/barbershopAdapter/IBarbershopAdapter";
import { BarbershopUseCase } from "../../domain/use-cases/BarbershopUseCase";

export class BarbershopController implements IBarbershopAdapter {
  constructor(private barbershopUseCase: BarbershopUseCase) {}

  async getAllBarbershops(): Promise<HttpBaseResponse<HttpAllBarberShopsRes>> {
    const { data, statusCode } =
      await this.barbershopUseCase.getAllBarbershops();
    return {
      statusCode,
      body: data,
    };
  }
  async getBarbershop(
    req: HttpRequestParams
  ): Promise<HttpBaseResponse<HttpBarberShopRes>> {
    const { id } = req.params;

    const { data, statusCode } = await this.barbershopUseCase.getBarbershop(id);

    return {
      statusCode,
      body: data,
    };
  }
  async getAllSchedules(
    req: HttpRequestQueryParams
  ): Promise<HttpBaseResponse<HttpSchedulesRes>> {
    const { id, date } = req.query;
    const { data, statusCode } = await this.barbershopUseCase.getAllSchedules(
      id,
      date
    );

    return {
      statusCode,
      body: data,
    };
  }
  async getAllBarbers(
    req: HttpRequestParams
  ): Promise<HttpBaseResponse<HttpBarbersRes>> {
    const { id } = req.params;
    const { data, statusCode } = await this.barbershopUseCase.getAllBarbers(id);

    return {
      statusCode,
      body: data,
    };
  }
}
