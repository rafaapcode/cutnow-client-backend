export class User {
  constructor(
    public nome: string,
    public primeiroNome: string,
    public sobreNome: string,
    public email: string,
    public avatar: string,
    public cpf?: string | null,
    public id?: string,
  ) {}
}
