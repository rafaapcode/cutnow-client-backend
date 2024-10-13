import { Barbers } from "../entities/Barbers";
import { Barbershop, Barbershops } from "../entities/Barbershop";
import { SchedulesToBarbershop } from "../entities/Schedules";

export type ReponseAllBarbershops = {
  statusCode: number;
  error: boolean;
  message: string;
  barbershop?: Barbershops[]
}

export type ReponseBarbershop = {
  statusCode: number;
  error: boolean;
  message: string;
  barbershop?: Barbershop
}

export type ReponseAllScheduleToBarbershop = {
  statusCode: number;
  error: boolean;
  message: string;
  schedules?: SchedulesToBarbershop[]
}

export type ReponseBarbersToBarbershop = {
  statusCode: number;
  error: boolean;
  message: string;
  barbers?: Barbers[]
}

export type ReponseServiceTypes = {
  statusCode: number;
  error: boolean;
  message: string;
  services?: {nomeService: string; preco: number}[]
}

export interface BarbershopRepository {
  getAllBarbershops(): Promise<ReponseAllBarbershops>
  getBarbershop(id: string): Promise<ReponseBarbershop>
  getAllSchedules(id: string, date: string): Promise<ReponseAllScheduleToBarbershop>
  getAllBarbers(id: string): Promise<ReponseBarbersToBarbershop>
  getServicesTypes(id: string): Promise<ReponseServiceTypes>
;}