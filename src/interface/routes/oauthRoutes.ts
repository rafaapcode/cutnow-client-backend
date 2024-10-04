import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Request, Response, Router } from "express";
import { GoogleSignIn } from "../../infraestructure/externalClients/GoogleSignIn";
import { JwtToken } from "../../infraestructure/jwtToken";
import { MongoUserRepository } from "../../infraestructure/repositories/MongoUserRepository";
import { JwtUseCase } from "../../use-cases/JwtUseCase";
import { OAuthUseCase } from "../../use-cases/OAuthUseCase";
import { UserUseCase } from "../../use-cases/UserUseCase";
import { OAuthController } from "../controllers/OAuthController";

const router = Router();

const fetcher = axios;
const googleSignIn = new GoogleSignIn(fetcher);
const oauthUseCase = new OAuthUseCase(googleSignIn);
const prisma = new PrismaClient();
const mongoUserRepo = new MongoUserRepository(prisma);
const userUseCase = new UserUseCase(mongoUserRepo);
const jwtToken = new JwtToken();
const jwtUseCase = new JwtUseCase(jwtToken);
const oauthController = new OAuthController(oauthUseCase, userUseCase, jwtUseCase);

router.post("/", (req: Request, res: Response) => oauthController.signIn(req, res))

export { router as oauthRoutes };

