export type HttpRequestResponse = {
  statusCode: number;
  data: {
    error: boolean;
    message: string;
  }
}

export type HttRequestCreate = {
  body: any
}


export type HttRequestDelete = {
  params: any
}

export interface IRequestAdapter {
  create(req: HttRequestCreate): Promise<HttpRequestResponse>;
  delete(req: HttRequestDelete): Promise<HttpRequestResponse>;
}