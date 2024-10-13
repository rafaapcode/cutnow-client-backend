export class SchedulesToUser {
  constructor(
    public tipoServico: string,
    public data: string,
  ) {}
}

export class SchedulesToBarber {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public data: string,
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
