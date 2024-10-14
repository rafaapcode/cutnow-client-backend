import { NewRequest } from "../../../domain/entities/Requests";
import { User } from "../../../domain/entities/User";
import { ReponseRequests, RequestRepository } from "../../../domain/interfaces/RequestsRepository";

export class FakerRequestRepository implements RequestRepository {
  public inMemoryDatabaseRequests = new Map<string, NewRequest>();
  public inMemoryDatabaseUser = new Map<string, User>([
    ["alan.turing@gmail.com", new User("Alan Turing", "Alan", "Turing", "alan.turing@gmail.com", "http://alanturing.png.com")]
  ]);

  async create(request: NewRequest): Promise<ReponseRequests> {
   try {
    if(!this.inMemoryDatabaseUser.get(request.emailCliente)) {
      return {
        error: true,
        message: "Usuário não existe",
        statusCode: 400
      }
    }

    this.inMemoryDatabaseRequests.set("507f191e810c19729de860ea", request);

    return {
      error: false,
      message: "Solicitação criada com sucesso",
      statusCode: 201
    }
   } catch (error: any) {
    return {
      error: true, 
      message: error.message,
      statusCode: 500
    }
   }
  }
  async delete(id: string): Promise<ReponseRequests> {
   try {
    if(!this.inMemoryDatabaseRequests.get(id)) {
      return {
        error: true,
        message: "Solicitação não encontrada",
        statusCode: 404
      }
    }
    
    this.inMemoryDatabaseRequests.delete(id);

    return {
      error: false,
      message: "Solicitação deletada com sucesso",
      statusCode: 200
    }
   } catch (error: any) {
    return {
      error: true, 
      message: error.message,
      statusCode: 500
    }
   }
  }
}