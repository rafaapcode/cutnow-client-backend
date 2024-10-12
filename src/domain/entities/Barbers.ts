
export class Barbers {
  constructor(
    public id: string,
    public email: string,
    public nome: string,
    public status: string,
    public informacoes: {
      portfolio: string[];
      banner: string;
      foto: string;
      descricao: string;
    } | null
  ) {}
}
