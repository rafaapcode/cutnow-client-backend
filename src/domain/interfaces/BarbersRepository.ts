import { Barbers } from "../entities/Barbers";

export type ResponseBarber = {
  error: boolean;
  barber?: Barbers
  message: string;
}

export interface BarbersRepository {
  getBarber(id: string): Promise<ResponseBarber>
}