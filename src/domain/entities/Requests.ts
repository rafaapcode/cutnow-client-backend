export class Requests {
  constructor(
    public id: string,
    public tipoServico: string,
    public nomeCliente: string,
    public data: string,
    public emailCliente: string
  ) {}
}

export class NewRequest {
  constructor(
    public tipoServico: string,
    public nomeCliente: string,
    public data: string,
    public emailCliente: string,
    public barbearia_id: string,
    public barbeiro_id: string
  ) {}
}
