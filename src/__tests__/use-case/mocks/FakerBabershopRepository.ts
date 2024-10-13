import { SchedulesToBarbershop } from "../../../domain/entities/Schedules";
import {
  BarbershopRepository,
  ReponseAllBarbershops,
  ReponseAllScheduleToBarbershop,
  ReponseBarbershop,
  ReponseBarbersToBarbershop,
} from "../../../domain/interfaces/BarbershopRepository";
export class FakerBarbershopRepository implements BarbershopRepository {
  public inMemoryDatabase = new Map<string, any>([
    [
      "123123",
      {
        informacoes: null,
        servicos: [{ nomeService: "Cabelo", tempoMedio: 120, preco: 79 }],
        barbeiros: [
          {
            id: "iiao19",
            nome: "joaquim",
            informacoes: {
              foto: "http://image.test.com",
            },
          },
        ],
      },
    ],
    [
      "4141511",
      {
        informacoes: undefined,
        servicos: undefined,
        barbeiros: [
          {
            id: "iiao19",
            nome: "joaquim",
            informacoes: {
              foto: "http://image.test.com",
            },
          },
        ],
      },
    ],
    [
      "0002920",
      {
        informacoes: undefined,
        servicos: [{ nomeService: "Cabelo", tempoMedio: 120, preco: 79 }],
        barbeiros: undefined,
        schedules: new SchedulesToBarbershop(
          "teste",
          "cabelo",
          "010/11/2024 - 19:00",
          {
            informacoes: {
              foto: "http://image.test.com",
            },
          }
        ),
      },
    ],
  ]);
  getAllBarbershops(): Promise<ReponseAllBarbershops> {
    throw new Error("Method not implemented.");
  }
  async getBarbershop(id: string): Promise<ReponseBarbershop> {
    if (!id) {
      return {
        statusCode: 400,
        error: true,
        message: "Id is required",
      };
    }
    const barbershop = this.getBarbershop(id);

    if (!barbershop) {
      return {
        error: true,
        message: "Barbearia não existe",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "Barbearia encontrada",
      statusCode: 200,
    };
  }
  async getAllSchedules(
    id: string,
    date: string
  ): Promise<ReponseAllScheduleToBarbershop> {

    const barbershop = this.inMemoryDatabase.get(id);

    if (!barbershop || !barbershop.schedules) {
      return {
        error: true,
        message: "Nenhuma agendamento disponível",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "Agendamentos encontrados",
      statusCode: 200,
      schedules: barbershop.schedules
    }
  }
  async getAllBarbers(id: string): Promise<ReponseBarbersToBarbershop> {
    const barbers = this.inMemoryDatabase.get(id);

    if(!barbers || !barbers.barbeiros) {
      return {
        error: true,
        message: "Nenhum barbeiro encontrado",
        statusCode: 404
      }
    }

    return {
      error: false,
      message: "Barbeiros encontrados",
      statusCode: 200,
      barbers: barbers.barbeiros
    }
  }
}
