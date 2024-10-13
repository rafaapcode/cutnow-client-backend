import { Barbers } from "../../../domain/entities/Barbers";
import { Requests } from "../../../domain/entities/Requests";
import { SchedulesToBarber } from "../../../domain/entities/Schedules";
import {
  BarbersRepository,
  ResponseBarber,
  ResponseRequestOfBarber,
  ResponseSchedulesOfBarber,
} from "../../../domain/interfaces/BarbersRepository";
export class FakerBarberRepository implements BarbersRepository {
  public inMemoryDatabase = new Map<string, Barbers>([
    [
      "123123",
      new Barbers("123123", "teste@gmail.com", "Alan", "Disponível", {
        banner: "http://foto.com",
        descricao: "Sou barbeiros a mais de 21 anos ...",
        foto: "http://logo.com.br",
        portfolio: [
          "http://img1.com",
          "http://img2.com",
          "http://img3.com",
          "http://img4.com",
          "http://img5.com"
        ]
      },[new SchedulesToBarber("Jailson", "Barba", "09/10/2024 - 09:30:00")]),
    ],
    [
      "14141415125162",
      new Barbers("14141415125162", "john@gmail.com", "John", "Indisponível", {
        banner: "http://foto.com",
        descricao: "Sou barbeiro especializado ...",
        foto: "http://logo.com.br",
        portfolio: [
          "http://img1.com",
          "http://img2.com",
          "http://img3.com",
          "http://img4.com",
          "http://img5.com"
        ]
      }, [new Requests("992", "Cabelo/Barba", "Lucao", "19/09/2024 - 18:00", "lucaodabike@gmail.com")]),
    ],
  ]);

  async getBarber(id: string): Promise<ResponseBarber> {
    const barber = this.inMemoryDatabase.get(id);
    if(!barber) {
      return {
        error: true,
        message: "Barbeiro não existe"
      }
    }
  return {
    error: false,
    message: "Barbeiro recuperado com sucesso",
    barber
  }
  }
  async getAllSchedules(
    id: string,
    data: string
  ): Promise<ResponseSchedulesOfBarber> {
    const barber = this.inMemoryDatabase.get(id);
    if(!barber) {
      return {
        error: true,
        message: "Barbeiro não existe"
      }
    }

    if(!barber.schedules) {
      return {
        error: true,
        message: "Não existe agendamentos"
      }
    }

    if(barber.schedules[0].data != data) {
      return {
        error: true,
        message: "Não possui agendamentos nessa data"
      }
    }

    return {
      error: true,
      message: "Agendamentos encontrados",
      schedules: barber.schedules
    }
  }
  async getRequests(id: string): Promise<ResponseRequestOfBarber> {
    const barber = this.inMemoryDatabase.get(id);
    if(!barber) {
      return {
        error: true,
        message: "Barbeiro não encontrado"
      }
    }

    if(!barber.requests) {
      return {
        error: true,
        message: "Nenhuma solicitação encontrada"
      }
    }

    return {
      error: false,
      message: "Solicitações encontradas",
      clientRequests: barber.requests
    }
  }
}
