import z from "zod";
import { NewRequest } from "../../domain/entities/Requests";
import { IValidator } from "../../domain/interfaces/Validators";

const requestSchema = z.object({
  tipoServico: z.string().min(4, {message: "Tipo de serviço deve ter no mínimo 4 caracteres"}),
  nomeCliente: z.string().min(3, {message: "Nome do cliente deve ter no mínimo 3 caracteres"}),
  data: z.string().min(15, {message: "A data deve ter no mínimo 15 caracteres"}),
  emailCliente: z.string().email({message: "Email inválido"}),
  barbearia_id: z.string().min(24, {message: "O barbearia_id deve ter no mínimo 24 caracteres"}),
  barbeiro_id: z.string().min(24, {message: "O barbeiro_id deve ter no mínimo 24 caracteres"})
});

export class RequestValidator implements IValidator<NewRequest> {
  validate(body: NewRequest): { error: boolean; message?: string; } {
    try {
      const { success, error } = requestSchema.safeParse(body);

      if(!success) {
        return {
          error: true,
          message: error.issues[0].message
        }
      }

      return {
        error: false,
        message: "Input data is correct"
      }
    } catch (error: any) {
      return {
        error: true,
        message: error.message
      }
    }
  }
}