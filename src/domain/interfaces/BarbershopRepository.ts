import { Barbers } from "../entities/Barbers";
import { Barbershop, Barbershops } from "../entities/Barbershop";

export type ReponseAllBarbershops = {
  statusCode: number;
  error: boolean;
  message: string;
  barbershop?: Barbershops[]
}

export type ReponseBarbershopByName = {
  statusCode: number;
  error: boolean;
  message: string;
  barbershops?: Barbershops[]
}

export type ReponseBarbershop = {
  statusCode: number;
  error: boolean;
  message: string;
  barbershop?: Barbershop
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
  getAllBarbers(id: string): Promise<ReponseBarbersToBarbershop>
  getServicesTypes(id: string): Promise<ReponseServiceTypes>
  getBarbershopByName(name: string): Promise<ReponseBarbershopByName>
;}