import { NewRequest } from "../entities/Requests";

export type ReponseRequests = {
  statusCode: number;
  error: boolean;
  message: string;
}

export interface RequestRepository {
  create(request: NewRequest): Promise<ReponseRequests>;
  delete(id: string): Promise<ReponseRequests>;
}