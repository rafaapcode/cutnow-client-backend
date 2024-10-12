import { logger } from "../../infraestructure/logger";
import { SchedulesToUser } from "../entities/Schedules";
import { User } from "../entities/User";
import {
  ReponseUserRepository,
  UserRepository,
} from "../interfaces/UserRepository";

export type UserUseCaseResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
  };
};

export type UserScheduleUseCaseResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
    schedules?: SchedulesToUser[];
  };
};

export class UserUseCase {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<ReponseUserRepository> {
    return await this.userRepository.findByEmail(email);
  }
  async create(user: User): Promise<ReponseUserRepository> {
    return await this.userRepository.create(user);
  }
  async updateCpf(email: string, cpf: string): Promise<UserUseCaseResponse> {
    if (!email || !cpf) {
      return {
        statusCode: 400,
        data: {
          error: true,
          message: "Email e CPF são obrigatórios.",
        },
      };
    }

    const updateCpf = await this.userRepository.updateCpf(email, cpf);
    if (updateCpf.error) {
      return {
        statusCode: 400,
        data: {
          error: true,
          message: updateCpf.message,
        },
      };
    }

    return {
      statusCode: 200,
      data: {
        error: false,
        message: "CPF atualizado com sucesso !",
      },
    };
  }
  async getAllSchedules(email: string): Promise<UserScheduleUseCaseResponse> {
   try {
    if(!email) {
      logger.warn("Nenhum email enviado")
      return  {
        statusCode: 400,
        data: {
          error: true,
          message: "Email is required"
        }
      }
    }

    const { error, data, message } = await this.userRepository.getAllSchedules(email);

    if(error) {
      logger.error("ocorreu um ero ao buscar os agendamentos do usuário");
      return {
        statusCode: 400,
        data: {
          error,
          message: message || ""
        }
      }
    }

    logger.info("Busca dos agendamentos bem sucedido");
    return {
      statusCode: 200,
      data: {
        error: false,
        message: "All schedules",
        schedules: data
      }
    }
   } catch (error: any) {
      logger.error("Ocorreu um erro ao buscar os agendamentos");
      return {
        statusCode: 500,
        data: {
          error: true,
          message: error.message
        }
      }
   }
  }
}
