import { Requests } from "./Requests";
import { SchedulesToBarber } from "./Schedules";

export class Barbers {
  constructor(
    public id: string,
    public email: string,
    public nome: string,
    public status: string,
    public informacoes: {
      portfolio?: string[];
      banner?: string;
      foto?: string;
      descricao?: string;
    } | null,
    public schedules?: SchedulesToBarber[],
    public requests?: Requests[]
  ) {}
}
