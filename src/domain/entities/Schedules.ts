export class SchedulesToUser {
  constructor(
    public tipoServico: string,
    public horario: Date,
    public dia: string
  ) {}
}

export class SchedulesToBarber {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public horario: Date,
    public dia: string
  ) {}
}

export class SchedulesToBarbershop {
  constructor(
    public nomeCliente: string,
    public tipoServico: string,
    public horario: Date,
    public dia: string,
    public barber?: {
      informacoes: {
        foto: string;
      };
    }
  ) {}
}
