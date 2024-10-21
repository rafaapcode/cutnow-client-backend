import { PrismaClient } from "@prisma/client";
import {
  BarbersRepository,
  ResponseBarber
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
          barbearia_id: true
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
      console.log("Error getBarber Method | Mongo Barber ", error.message);
      return {
        error: true,
        message: error.message,
      };
    }finally {
      await this.prisma.$disconnect();
    }
  }
}
