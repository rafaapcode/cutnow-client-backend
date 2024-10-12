import { Barbers } from "../entities/Barbers";
import { Requests } from "../entities/Requests";
import { SchedulesToBarber } from "../entities/Schedules";

export type ResponseBarber = {
  error: boolean;
  barber?: Barbers
}

export type ResponseSchedulesOfBarber = {
  error: boolean;
  schedules?: SchedulesToBarber[]
}

export type ResponseRequestOfBarber = {
  error: boolean;
  clientRequests?: Requests[]
}

export interface BarbersRepository {
  getBarber(id: string): Promise<ResponseBarber>
  getAllSchedules(id: string, date: Date): Promise<ResponseSchedulesOfBarber>
  getRequests(id: string): Promise<ResponseRequestOfBarber>;
}