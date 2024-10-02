export type ReponseGoogleOAuth = {
  error: boolean;
  data?: any;
  message: string;
}

export interface OAuthRepository {
  signIn(code: string): Promise<ReponseGoogleOAuth>
};