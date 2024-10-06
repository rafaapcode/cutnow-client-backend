import { PrismaClient } from "@prisma/client";
import { User } from "../../domain/entities/User";
import {
  ReponseUserRepository,
  UserRepository,
} from "../../domain/interfaces/UserRepository";
import { logger } from "../logger";

export class MongoUserRepository implements UserRepository {

  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<ReponseUserRepository> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        logger.info("Usuário não existe");
        return {
          message: "Usuário não existe",
          error: true
        };
      }

      logger.info("Usuário encontrado");
      return {
        message: "Usuário encontrado com sucesso !",
        data: user,
        error: false
      };
    } catch (error: any) {
      logger.error("findByEmail error", error)
      return {
        message: error.message,
        error: true,
      };
    }
  }
  async create(user: User): Promise<ReponseUserRepository> {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: user.email
        }
      });

      if(userExists) {
        logger.info("Usuário existente !");
        return {
          error: true,
          message: "Usuário já existe",
          data: userExists
        }
      }

      const newUser = await this.prisma.user.create({
        data: user,
      });

      logger.info("Usuário criado com sucesso !");
      return {
        message: "Usuário criado com sucesso !",
        data: newUser,
        error: false
      };
    } catch (error: any) {
      logger.error("createUser error", error)
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
      logger.info("Cpf Atualizado");
      return {
        message: "CPF atualizado com sucesso !",
        error: false
      };
    } catch (error: any) {
      logger.error("updateCpf error", error)
      return {
        message: error.message,
        error: true,
      };
    }
  }
}
