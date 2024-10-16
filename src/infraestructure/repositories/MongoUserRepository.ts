import type { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/User";
import {
  ReponseUserRepository,
  ReponseUserSchedules,
  UserRepository,
} from "../../domain/interfaces/UserRepository";

export class MongoUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async getAllSchedules(email: string): Promise<ReponseUserSchedules> {
    try {
      const schedules = await this.prisma.user.findMany({
        where: {
          email,
        },
        include: {
          Agendamentos: {
            select: {
              tipoServico: true,
              data: true
            },
          },
        },
      });

      if (!schedules[0].Agendamentos) {
        return {
          error: true,
          message: "Não possui agendamentos",
        };
      }

      return {
        error: false,
        data: schedules[0].Agendamentos!,
      };
    } catch (error: any) {
      return {
        error: true,
        message: "erro interno",
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }
  async findByEmail(email: string): Promise<ReponseUserRepository> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          message: "Usuário não existe",
          error: true,
        };
      }

      return {
        message: "Usuário encontrado com sucesso !",
        data: user,
        error: false,
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }
  async create(user: User): Promise<ReponseUserRepository> {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userExists) {
        return {
          error: true,
          message: "Usuário já existe",
          data: userExists,
        };
      }

      const newUser = await this.prisma.user.create({
        data: user,
      });

      return {
        message: "Usuário criado com sucesso !",
        data: newUser,
        error: false,
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    } finally {
      await this.prisma.$disconnect();
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
        error: false,
      };
    } catch (error: any) {
      return {
        message: error.message,
        error: true,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
