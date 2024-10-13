
export class Barbershop {
  constructor(
    public id: string,
    public nomeDaBarbearia: string,
    public informacoes?: {
      cep: string;
      rua: string;
      bairro: string;
      cidade: string;
      estado: string;
      numero: number;
      horarioAbertura: string;
      horarioFechamento: string;
      fotosEstruturaBarbearia: string[];
      fotoBanner: string;
      logo: string;
      status: string;
    } | undefined,
    public servicos?: {
      nomeService: string;
      tempoMedio: number;
      preco: number;
    }[],
    public barbeiros?: {
      id: string;
      nome: string;
      informacoes: {
        foto: string;
      }
    }[]
  ) {}
}

export class Barbershops {
  constructor(
    public id: string,
    public nomeDaBarbearia: string,
    public informacoes: {
      logo: string;
      status: string;
    },
  ) {}
}

