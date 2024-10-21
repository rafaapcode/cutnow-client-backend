import { Barbers } from "../../domain/entities/Barbers";

export type HttpGetBarberRequest = {
  params: any;
}

export type HttpGetBarberResponse = {
  statusCode: number;
  data: {
    error: boolean;
    barber?: Barbers
  }
}


export interface IBarberAdapter {
  getBarber(req: HttpGetBarberRequest): Promise<HttpGetBarberResponse>;
}