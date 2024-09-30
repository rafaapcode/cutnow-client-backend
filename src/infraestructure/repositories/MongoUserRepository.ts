import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/User";
import {
  ReponseUserRepository,
  UserRepository,
} from "../../domain/interfaces/UserRepository";

export class MongoUserRepository implements UserRepository {

  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<ReponseUserRepository> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          message: "Usuário não existe",
        };
      }

      return {
        message: "Usuário encontrado com sucesso !",
        data: user,
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    }
  }
  async create(user: User): Promise<ReponseUserRepository> {
    try {
      const newUser = await this.prisma.user.create({
        data: user,
      });

      return {
        message: "Usuário criado com sucesso !",
        data: newUser,
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    }
  }
  async updateCpf(email: string, cpf: string): Promise<ReponseUserRepository> {
    try {
      await this.prisma.user.update({
        where: { email },
        data: {
          cpf,
        },
      });

      return {
        message: "CPF atualizado com sucesso !",
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    }
  }
}
