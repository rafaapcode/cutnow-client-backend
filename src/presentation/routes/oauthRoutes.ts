import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { Router } from "express";
import { ExpressOauthAdapter } from "../../adapters/oauthAdapter/expressOauthAdapter";
import { JwtUseCase } from "../../domain/use-cases/JwtUseCase";
import { OAuthUseCase } from "../../domain/use-cases/OAuthUseCase";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";
import { GoogleSignIn } from "../../infraestructure/externalClients/GoogleSignIn";
import { JwtToken } from "../../infraestructure/jwtToken";
import { MongoUserRepository } from "../../infraestructure/repositories/MongoUserRepository";
import { OAuthController } from "../controllers/OAuthController";

const router = Router();

const fetcher = axios;
const googleSignIn = new GoogleSignIn(fetcher);
const prisma = new PrismaClient();
const mongoUserRepo = new MongoUserRepository(prisma);
const userUseCase = new UserUseCase(mongoUserRepo);
const jwtToken = new JwtToken();
const jwtUseCase = new JwtUseCase(jwtToken);
const oauthUseCase = new OAuthUseCase(googleSignIn, userUseCase, jwtUseCase);
const oauthController = new OAuthController(oauthUseCase);

router.post("/", ExpressOauthAdapter.signIn(oauthController))

export { router as oauthRoutes };

