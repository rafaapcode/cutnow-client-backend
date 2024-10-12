import { User } from "../../../domain/entities/User";
import { BarbersRepository, ResponseBarber, ResponseRequestOfBarber, ResponseSchedulesOfBarber } from "../../../domain/interfaces/BarbersRepository";
export class FakerBarberRepository implements BarbersRepository {
  public inMemoryDatabase = new Map<string, User>();

  

  getBarber(id: string): Promise<ResponseBarber> {
    throw new Error("Method not implemented.");
  }
  getAllSchedules(id: string, data: string): Promise<ResponseSchedulesOfBarber> {
    throw new Error("Method not implemented.");
  }
  getRequests(id: string): Promise<ResponseRequestOfBarber> {
    throw new Error("Method not implemented.");
  }
} 