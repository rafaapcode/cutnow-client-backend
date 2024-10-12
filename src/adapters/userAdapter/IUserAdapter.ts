import { SchedulesToUser } from "../../domain/entities/Schedules";

export type HttpRequestUser = {
  data: any;
  params: any;
}

export type HttpResponseUser = {
  statusCode: number;
  body: {
    error: boolean;
    message: string;
  };
}

export type HttpRequestUserSchedules = {
  params: any;
}

export type HttpResponseUserSchedules = {
  statusCode: number;
  body: {
    error: boolean;
    message: string;
    schedules?: SchedulesToUser[];
  };
};

export interface IUserAdapter {
  updateCpf(req: HttpRequestUser): Promise<HttpResponseUser>;
  getAllSchedules(req: HttpRequestUserSchedules): Promise<HttpResponseUserSchedules>;
}