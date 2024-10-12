export class SchedulesToUser {
  constructor(
    public tipoServico: string,
    public data: Date,
  ) {}
}

export class SchedulesToBarber {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public data: Date,
  ) {}
}

export class SchedulesToBarbershop {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public data: Date,
    public barber?: {
      informacoes: {
        foto: string;
      };
    }
  ) {}
}
