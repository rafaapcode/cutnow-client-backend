import { SchedulesToUser } from "../entities/Schedules";
import { User } from "../entities/User";

export type ReponseUserRepository = {
  message: string;
  error: boolean;
  data?: User | null; 
}

export type ReponseUserSchedules = {
  error: boolean;
  data?: SchedulesToUser[] 
}

export interface UserRepository {
  findByEmail(email: string): Promise<ReponseUserRepository>;
  create(user: User): Promise<ReponseUserRepository>;
  updateCpf(email: string, cpf: string): Promise<ReponseUserRepository>; 
  getAllSchedules(email: string): Promise<ReponseUserSchedules>
};