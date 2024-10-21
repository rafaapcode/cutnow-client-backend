import { Barbers } from "../../domain/entities/Barbers";
import { Barbershop, Barbershops } from "../../domain/entities/Barbershop";
import { SchedulesToBarbershop } from "../../domain/entities/Schedules";

export type HttpRequestParams = {
  params: any;
};

export type HttpRequestQueryParams = {
  query: any;
};

export type HttpBaseResponse<T> = {
  statusCode: number;
  body: T;
};

export type ReponseServiceTypes = {
  statusCode: number;
  error: boolean;
  message: string;
  services?: {nomeService: string; preco: number}[]
}

export type HttpAllBarberShopsRes = {
  error: boolean;
  message: string;
  barbershop?: Barbershops[];
};

export type HttpAllBarberShopByName = {
  error: boolean;
  message: string;
  barbershops?: Barbershops[];
};

export type HttpBarberShopRes = {
  error: boolean;
  message: string;
  barbershop?: Barbershop;
};

export type HttpSchedulesRes = {
  error: boolean;
  message: string;
  schedules?: SchedulesToBarbershop[]
};


export type HttpBarbersRes = {
  error: boolean;
  message: string;
  barbers?: Barbers[]
};

export interface IBarbershopAdapter {
  getAllBarbershops(): Promise<HttpBaseResponse<HttpAllBarberShopsRes>>;
  getBarbershop(req: HttpRequestParams): Promise<HttpBaseResponse<HttpBarberShopRes>>;
  getAllBarbers(req: HttpRequestParams): Promise<HttpBaseResponse<HttpBarbersRes>>;
  getBarbershopByName(req: HttpRequestQueryParams): Promise<HttpBaseResponse<HttpAllBarberShopByName>>;
  getServiceType(req: HttpRequestQueryParams): Promise<HttpBaseResponse<ReponseServiceTypes>>;
}
