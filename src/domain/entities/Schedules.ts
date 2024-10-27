export class SchedulesToUser {
  constructor(
    public data: string,
    public barbearia: {
      nomeDaBarbearia: string;
    },
    public barbeiro: {
      nome: string;
      informacoes: {
        foto: string;
      } | null;
    }
  ) {}
}

export class SchedulesToBarber {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public data: string
  ) {}
}

export class SchedulesToBarbershop {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public data: string,
    public barbeiro?: {
      informacoes: {
        foto: string;
      } | null;
    }
  ) {}
}
