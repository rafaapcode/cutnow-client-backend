import { User } from "../entities/User";

export type ReponseUserRepository = {
  message: string;
  error: boolean;
  data?: User | null; 
}

export interface UserRepository {
  findByEmail(email: string): Promise<ReponseUserRepository>;
  create(user: User): Promise<ReponseUserRepository>;
  updateCpf(email: string, cpf: string): Promise<ReponseUserRepository>; 
};