import { User } from "../entities/User";
import { ReponseUserRepository, UserRepository } from "../interfaces/UserRepository";

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string):Promise<ReponseUserRepository> {
    return await this.userRepository.findByEmail(email);
  }
  async create(user: User): Promise<ReponseUserRepository> {
    return await this.userRepository.create(user);
  }
  async updateCpf(email: string, cpf: string): Promise<ReponseUserRepository> {
    return await this.userRepository.updateCpf(email, cpf);
  }
}