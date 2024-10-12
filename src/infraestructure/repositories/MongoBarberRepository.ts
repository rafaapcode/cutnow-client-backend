import { PrismaClient } from "@prisma/client";
import {
  BarbersRepository,
  ResponseBarber,
  ResponseRequestOfBarber,
  ResponseSchedulesOfBarber,
} from "../../domain/interfaces/BarbersRepository";

export class MongoBarberRepositor implements BarbersRepository {
  constructor(private prisma: PrismaClient) {}

  async getBarber(id: string): Promise<ResponseBarber> {
    try {
      const barber = await this.prisma.barbeiro.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          nome: true,
          status: true,
          informacoes: {
            select: {
              portfolio: true,
              banner: true,
              foto: true,
              descricao: true,
            },
          },
        },
      });
      if (!barber) {
        return {
          error: true,
          message: "Barber not found",
          barber: undefined,
        };
      }

      return {
        error: false,
        message: "Barber found",
        barber,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
  async getAllSchedules(
    id: string,
    data: string
  ): Promise<ResponseSchedulesOfBarber> {
    try {
      const schedules = await this.prisma.barbearia.findMany({
        where: {
          id,
        },
        include: {
          Agendamentos: {
            where: {
              data,
            },
            select: {
              nomeCliente: true,
              tipoServico: true,
              data: true,
            },
          },
        },
      });

      if (!schedules) {
        return {
          error: true,
          message: "Nenhum agendamento encontrado",
          schedules: undefined
        };
      }

      if (!schedules[0].Agendamentos) {
        return {
          error: true,
          message: "Nenhum agendamento encontrado",
          schedules: undefined
        };
      }

      return {
        error: true,
        message: "Agendamentos encontrados",
        schedules: schedules[0].Agendamentos,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
  async getRequests(id: string): Promise<ResponseRequestOfBarber> {
    try {
      const requests = await this.prisma.barbeiro.findMany({
        where: {
          id
        },
        include: {
          solicitacoes: {
            select: {
              id: true,
              tipoServico: true,
              nomeCliente: true,
              data: true,
              emailCliente: true
            }
          }
        }
      });

      if(!requests || !requests[0].solicitacoes){
        return {
          error: true,
          message: "Nenhuma solicitação encontrada"
        }
      }

      return {
        error: false,
        message: "Solicitações encontradas",
        clientRequests: requests[0].solicitacoes
      }

    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
