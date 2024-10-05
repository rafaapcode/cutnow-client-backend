export type HttpRequestUser = {
  data: any;
  params: any;
}

export type HttpResponseUser = {
  statusCode: number;
  body: {
    error: boolean;
    message: string;
  };
}

export interface IUserAdapter {
  updateCpf(req: HttpRequestUser): Promise<HttpResponseUser>;
}