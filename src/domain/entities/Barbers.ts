import { Barbeiro } from "@prisma/client";

export class Barbers implements Barbeiro {
  constructor(
    public id: string,
    public email: string,
    public nome: string,
    public senha: string,
    public cpf: string,
    public status: string,
    public barbearia_id: string,
    public informacoes: {
      portfolio: string[];
      banner: string;
      foto: string;
      descricao: string;
    } | null
  ) {}
}
