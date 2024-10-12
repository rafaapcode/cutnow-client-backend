import { Barbers } from "../../domain/entities/Barbers";
import { Requests } from "../../domain/entities/Requests";
import { SchedulesToBarber } from "../../domain/entities/Schedules";

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

export type HttpGetAllSchedulesRequest = {
  query: any;
}

export type HttpGetAllSchedulesResponse = {
  statusCode: number;
  data: {
    error: boolean;
    schedules?: SchedulesToBarber[]
  }
}

export type HttpGetAllRequest = {
  params: any;
}

export type HttpGetAllRequestsResponse = {
  statusCode: number;
  data: {
    error: boolean;
    requests?: Requests[]
  }
}

export interface IBarberAdapter {
  getBarber(req: HttpGetBarberRequest): Promise<HttpGetBarberResponse>;
  getAllSchedules(req: HttpGetAllSchedulesRequest): Promise<HttpGetAllSchedulesResponse>;
  getAllRequests(req: HttpGetAllRequest): Promise<HttpGetAllRequestsResponse>;
}