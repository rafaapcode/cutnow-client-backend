import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/interfaces/UserRepository";

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string):Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
  async create(user: User): Promise<User> {
    return await this.userRepository.create(user);
  }
  async updateCpf(email: string): Promise<void> {
    await this.userRepository.updateCpf(email);
  }
}