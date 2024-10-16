import { PrismaClient } from "@prisma/client";
import { NewRequest } from "../../domain/entities/Requests";
import { ReponseRequests, RequestRepository } from "../../domain/interfaces/RequestsRepository";

export class MongoRequestRepository implements RequestRepository {
  
  constructor(private prisma: PrismaClient){}
  
  async create(inputdata: NewRequest): Promise<ReponseRequests> {
    try {
        return this.prisma.$transaction(async (tx) => {
          const user = await tx.user.findUnique({
            where: {
              email: inputdata.emailCliente
            }
          });

          if(!user) {
            return {
              error: true,
              message: "Usuário não existe",
              statusCode: 400
            }
          }

          await tx.solicitacoes.create({
            data: inputdata
          })

          return {
            error: false,
            message: "Solicitação criada com sucesso",
            statusCode: 201
          }
        });
    } catch (error: any) {
        console.log("Error CreateRequest | Mongo Request ", error.message);
        return  {
          error: true,
          message: error.message,
          statusCode: 500
        }
    } finally {
      await this.prisma.$disconnect();
    }
  }
  async delete(id: string): Promise<ReponseRequests> {
    try {
      const requests = await this.prisma.solicitacoes.delete({
        where: { id }
      });
      
      if(!requests) {
        return {
          error: true,
          message: "Solicitação não encontrada",
          statusCode: 404
        }
      }

      return {
        error: false,
        message: "Solicitação deletada com sucesso",
        statusCode: 200
      }
    } catch (error: any) {
      console.log("Error DeleteRequest | Mongo Request ", error.message);
      return {
        error: true, 
        message: error.message,
        statusCode: 500
      }
    } finally {
      await this.prisma.$disconnect();
    }
  }
  
}