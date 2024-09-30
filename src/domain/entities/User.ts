export class User {
  constructor(
    public name: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public avatar: string,
    public cpf?: string,
    public id?: string,
  ) {}
}
