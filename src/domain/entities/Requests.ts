
export class Requests {
  constructor(
    public id: string,
    public tipoServico: string,
    public nomeCliente: string,
    public horario: Date,
    public dia: string,
    public emailCliente: string,
    public barbearia_id: string,
    public barbeiro_id: string
  ) {}
}
