import { HttpRequestOauth, HttpResponseOauth, IOAuthAdapter } from "../../adapters/oauthAdapter/IOauthAdapter";
import { OAuthUseCase } from "../../domain/use-cases/OAuthUseCase";

export class OAuthController implements IOAuthAdapter{
  constructor(private oauthUseCase: OAuthUseCase) {}

  async signIn(req: HttpRequestOauth): Promise<HttpResponseOauth> {
    const { code } = req.data;
    const { data, statusCode } = await this.oauthUseCase.signIn(code);
    return {
      statusCode,
      body: data
    }
  }
}
