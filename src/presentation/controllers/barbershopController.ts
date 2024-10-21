import {
  HttpAllBarberShopByName,
  HttpAllBarberShopsRes,
  HttpBarberShopRes,
  HttpBarbersRes,
  HttpBaseResponse,
  HttpRequestParams,
  HttpRequestQueryParams,
  IBarbershopAdapter,
  ReponseServiceTypes,
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
  async getBarbershopByName(
    req: HttpRequestQueryParams
  ): Promise<HttpBaseResponse<HttpAllBarberShopByName>> {
    const { name } = req.query;
    const { data, statusCode } =
      await this.barbershopUseCase.getBarbershopByName(name);
    return {
      statusCode,
      body: data,
    };
  }
  async getServiceType(
    req: HttpRequestParams
  ): Promise<HttpBaseResponse<ReponseServiceTypes>> {
    const { id } = req.params;
    const { data, statusCode } = await this.barbershopUseCase.getServicesType(
      id
    );
    return {
      statusCode,
      body: data,
    };
  }
}
