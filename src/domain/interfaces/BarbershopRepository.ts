import { Barbers } from "../entities/Barbers";
import { Barbershop, Barbershops } from "../entities/Barbershop";
import { SchedulesToBarbershop } from "../entities/Schedules";

export type ReponseAllBarbershops = {
  error: boolean;
  barbershop?: Barbershops[]
}

export type ReponseBarbershop = {
  error: boolean;
  barbershop?: Barbershop
}

export type ReponseAllScheduleToBarbershop = {
  error: boolean;
  schedules?: SchedulesToBarbershop[]
}

export type ReponseBarbersToBarbershop = {
  error: boolean;
  barbers?: Barbers[]
}

export interface BarbershopRepository {
  getAllBarbershops(): Promise<ReponseAllBarbershops>
  getBarbershop(id: string): Promise<ReponseBarbershop>
  getAllSchedules(id: string, date: Date): Promise<ReponseAllScheduleToBarbershop>
  getAllBarbers(id: string): Promise<ReponseBarbersToBarbershop>
}