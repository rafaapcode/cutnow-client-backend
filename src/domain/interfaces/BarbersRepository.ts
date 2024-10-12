import { Barbers } from "../entities/Barbers";
import { Requests } from "../entities/Requests";
import { SchedulesToBarber } from "../entities/Schedules";

export type ResponseBarber = {
  error: boolean;
  barber?: Barbers
  message: string;
}

export type ResponseSchedulesOfBarber = {
  error: boolean;
  schedules?: SchedulesToBarber[];
  message: string;
}

export type ResponseRequestOfBarber = {
  error: boolean;
  clientRequests?: Requests[];
  message: string;
}

export interface BarbersRepository {
  getBarber(id: string): Promise<ResponseBarber>
  getAllSchedules(id: string, data: string): Promise<ResponseSchedulesOfBarber>
  getRequests(id: string): Promise<ResponseRequestOfBarber>;
}