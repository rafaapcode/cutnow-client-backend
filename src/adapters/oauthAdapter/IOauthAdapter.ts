export type HttpRequestOauth = {
  data: any;
}

export type HttpResponseOauth = {
  statusCode: number;
  body: {
    error: boolean;
    message: string;
    token?: string | undefined;
  };
}

export interface IOAuthAdapter {
  signIn(req: HttpRequestOauth): Promise<HttpResponseOauth>;
}