export type PayloadTokenType = {
  email: string;
  nome: string;
}

export type ResponseToken = {
  error: boolean;
  token?: string;
  message: string;
}

export interface JWTTokenRepository {
  createToken(payload: PayloadTokenType): ResponseToken
}