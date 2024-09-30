import { User } from "../entities/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User>;
  create(user: User): Promise<User>;
  updateCpf(email: string): Promise<void>; 
};