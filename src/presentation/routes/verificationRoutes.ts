import { Router } from "express";
import { ExpressAuthenticateAdapter } from "../../adapters/verifyAuthenticationAdapter/expressAuthenticateAdapter";
import { AuthVerificationUseCase } from "../../domain/use-cases/AuthVerificationUseCase";
import { JwtUseCase } from "../../domain/use-cases/JwtUseCase";
import { JwtToken } from "../../infraestructure/jwtToken";
import { VerifyAuthenticationController } from "../controllers/VerifyAuthenticationController";

const router = Router();

const jwtToken = new JwtToken();
const jwtUseCase = new JwtUseCase(jwtToken);
const verificationUseCase = new AuthVerificationUseCase(jwtUseCase);
const verifyAuthController = new VerifyAuthenticationController(verificationUseCase);

router.get("/", ExpressAuthenticateAdapter.isAuth(verifyAuthController))

export { router as authVerificationRoutes };

