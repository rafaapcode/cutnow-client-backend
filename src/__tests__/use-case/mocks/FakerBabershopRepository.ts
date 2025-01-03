import {
  BarbershopRepository,
  ReponseAllBarbershops,
  ReponseBarbershop,
  ReponseBarbershopByName,
  ReponseBarbersToBarbershop,
  ReponseServiceTypes,
} from "../../../domain/interfaces/BarbershopRepository";
export class FakerBarbershopRepository implements BarbershopRepository {
  public inMemoryDatabase = new Map<string, any>([
    [
      "123123123123",
      {
        nomeDaBarbearia: "zé ninguém",
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
      "41415114141511",
      {
        nomeDaBarbearia: "Barbers",
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
      "00029200002920",
      {
        nomeDaBarbearia: "Barbers",
        informacoes: undefined,
        servicos: [{ nomeService: "Cabelo", tempoMedio: 120, preco: 79 }],
        barbeiros: undefined,
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
    const barbershop = this.inMemoryDatabase.get(id);

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
  async getAllBarbers(id: string): Promise<ReponseBarbersToBarbershop> {
    const barbers = this.inMemoryDatabase.get(id);

    if (!barbers || !barbers.barbeiros) {
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
      barbers: barbers.barbeiros,
    };
  }

  async getServicesTypes(id: string): Promise<ReponseServiceTypes> {
    const servicesType = this.inMemoryDatabase.get(id);

    if (!servicesType || !servicesType.servicos) {
      return {
        error: true,
        message: "Essa barbearia não possuio nenhum serviço",
        statusCode: 404,
      };
    }

    return {
      error: false,
      message: "Serviços recuperados",
      statusCode: 200,
      services: servicesType.servicos,
    };
  }
  async getBarbershopByName(name: string): Promise<ReponseBarbershopByName> {
    const barbershopsWithName = [];

    for (let [, val] of this.inMemoryDatabase) {
      if (val.nomeDaBarbearia === name) {
        barbershopsWithName.push(val);
      }
    }

    if (barbershopsWithName.length === 0) {
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
      barbershops: barbershopsWithName,
    };
  }
}
