import { HttpRequestTokenAuth, HttpResponseIsAuth, IVerificationAdapter } from "../../adapters/verifyAuthenticationAdapter/IVerificationAdapter";
import { AuthVerificationUseCase } from "../../domain/use-cases/AuthVerificationUseCase";

export class VerifyAuthenticationController implements IVerificationAdapter {
  constructor(private verifyAuth: AuthVerificationUseCase){}

  async isAuth(req: HttpRequestTokenAuth): Promise<HttpResponseIsAuth> {
    const {error, isAuthenticate, message} = this.verifyAuth.isAuth(req.token);
    if(error) {
      return {
        statusCode: 403,
        body: {
          error,
          isAuthenticate, 
          message
        }
      }
    }
    return {
      statusCode: 200,
      body: {
        error,
        isAuthenticate, 
        message
      }
    }
  }
  
}