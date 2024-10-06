import { User } from "../../../domain/entities/User";
import { ReponseUserRepository, UserRepository } from "../../../domain/interfaces/UserRepository";
export class FakerUserRepository implements UserRepository {
  public inMemoryDatabase = new Map<string, User>();

  async findByEmail(email: string): Promise<ReponseUserRepository> {
    try {
      if (!email) {
        return {
          message: "Email é obrigatório",
          error: true
        };
      }

      if(this.inMemoryDatabase.has(email)) {
        return {
          message: "Usuário não existe",
          error: true
        };
      }
      
      return {
        message: "Usuário encontrado com sucesso !",
        data: this.inMemoryDatabase.get(email),
        error: false
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    }
  }
  async create(user: User): Promise<ReponseUserRepository> {
    const fakerUser = this.inMemoryDatabase.get(user.email);
    if(fakerUser) {
      return {
        error: true,
        message: "Usuário já existe"
      }
    }

    this.inMemoryDatabase.set(user.email, user);
    
    return {
      error: false,
      message: "Usuário criado com sucesso !",
      data: user
    }
  }
  async updateCpf(email: string, cpf: string): Promise<ReponseUserRepository> {
    const fakerUser = this.inMemoryDatabase.get(email);

    if(!fakerUser) {
      return {
        error: true,
        message: "Usuário não existe"
      }
    }
    fakerUser.cpf = cpf

    this.inMemoryDatabase.set(email, fakerUser);

    return {
      error: false,
      message: "Usuário atualizado com sucesso"
    }
  }
} 