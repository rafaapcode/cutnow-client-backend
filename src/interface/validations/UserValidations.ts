import { z } from "zod";

export const UserValidationSchema = z.object({
  nome: z.string().min(5, {message: "Nome deve ter no mínimo 5 caracteres"}),
  primeiroNome: z.string().min(3, {message: "PrimeiroNome deve ter no mínimo 3 caracteres"}),
  sobreNome: z.string().min(3, {message: "SobreNome deve ter no mínimo 3 caracteres"}),
  email: z.string().email({message: "Email inválido"}),
  avatar:  z.string().url({message: "O avatar deve ser uma url"}),
  cpf: z.string().min(11, {message: "Nome deve ter no mínimo 11 caracteres"}).max(11, {message: "Nome deve ter no máximo 11 caracteres"}).optional()
});