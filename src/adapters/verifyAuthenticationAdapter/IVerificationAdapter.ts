export type HttpRequestTokenAuth = {
  token: string;
}

export type HttpResponseIsAuth = {
  statusCode: number;
  body: {
    error: boolean;
    message: string;
    isAuthenticate: boolean;
  };
}

export interface IVerificationAdapter {
  isAuth(req: HttpRequestTokenAuth): Promise<HttpResponseIsAuth>;
}