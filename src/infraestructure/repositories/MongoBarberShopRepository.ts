import type { PrismaClient } from "@prisma/client";
import {
  BarbershopRepository,
  ReponseAllBarbershops,
  ReponseBarbershop,
  ReponseBarbersToBarbershop,
  ReponseServiceTypes
} from "../../domain/interfaces/BarbershopRepository";

export class MongoBarbershopRepository implements BarbershopRepository {
  constructor(private prisma: PrismaClient) {}
  async getAllBarbershops(): Promise<ReponseAllBarbershops> {
    try {
      const barbershops = await this.prisma.barbearia.findMany({
        select: {
          id: true,
          nomeDaBarbearia: true,
          informacoes: {
            select: {
              logo: true,
              status: true,
            },
          },
        },
      });

      if (!barbershops) {
        return {
          error: true,
          message: "Nenhuma barbearia encontrada",
          statusCode: 404,
        };
      }

      return {
        error: false,
        message: "Barbearias encontradas",
        statusCode: 200,
        barbershop: barbershops,
      };
    } catch (error: any) {
      console.log("Error getAllBarbershops Method | Mongo BarberShop ", error.message);
      return {
        error: true,
        statusCode: 500,
        message: error.message,
      };
    } finally {
      this.prisma.$disconnect();
    }
  }
  async getBarbershop(id: string): Promise<ReponseBarbershop> {
    try {
      const barbershop = await this.prisma.barbearia.findUnique({
        where: { id },
        include: {
          barbeiro: {
            select: {
              id: true,
              nome: true,
              informacoes: {
                select: {
                  foto: true,
                },
              },
            },
          },
        },
      });

      if (!barbershop) {
        return {
          error: true,
          message: "Barbearia não existe",
          statusCode: 404,
        };
      }

      const { email, senha, ...barbershopInfo } = barbershop;

      return {
        error: false,
        message: "Barbearia encontrada",
        statusCode: 200,
        barbershop: barbershopInfo,
      };
    } catch (error: any) {
      console.log("Error getBarbershop Method | Mongo BarberShop ", error.message);
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    } finally {
      this.prisma.$disconnect();
    }
  }
  async getAllBarbers(id: string): Promise<ReponseBarbersToBarbershop> {
    try {
      const barbers = await this.prisma.barbearia.findUnique({
        where: { id },
        include: {
          barbeiro: {
            select: {
              id: true,
              email: true,
              nome: true,
              status: true,
              informacoes: {
                select: {
                  foto: true,
                  descricao: true,
                },
              },
            },
          },
        },
      });

      if (!barbers || !barbers.barbeiro) {
        return {
          error: true,
          message: "Nenhum barbeiro encontrado",
          statusCode: 404,
        };
      }

      return {
        error: false,
        message: "Barbeiros encontrados",
        statusCode: 200,
        barbers: barbers.barbeiro,
      };
    } catch (error: any) {
      console.log("Error getAllBarbers Method | Mongo BarberShop ", error.message);
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    } finally {
      this.prisma.$disconnect();
    }
  }
  async getServicesTypes(id: string): Promise<ReponseServiceTypes> {
    try {
      const serviceTypes = await this.prisma.barbearia.findUnique({
        where: {
          id
        },
        select: {
          servicos: {
            select: {
              nomeService: true,
              preco: true
            }
          }
        }
      });

      if(!serviceTypes || !serviceTypes.servicos) {
        return {
          error: true,
          message: "Essa barbearia não possuio nenhum serviço",
          statusCode: 404,
        }
      }

      return {
        error: false,
        message: "Serviços recuperados",
        statusCode: 200,
        services: serviceTypes.servicos
      }
    } catch (error: any) {
      console.log("Error getServicesTypes Method | Mongo BarberShop ", error.message);
      return {
        error: true,
        message: error.message,
        statusCode: 500,
      };
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
