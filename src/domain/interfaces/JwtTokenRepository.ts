export type PayloadTokenType = {
  email: string;
  nome: string;
}

export type ResponseToken = {
  error: boolean;
  token?: string;
  message: string;
}

export type ResponseAuthVerification = {
  error: boolean;
  message: string;
  isAuthenticate: boolean;
}

export interface JWTTokenRepository {
  createToken(payload: PayloadTokenType): ResponseToken
  verifyToken(token: string): ResponseAuthVerification
}