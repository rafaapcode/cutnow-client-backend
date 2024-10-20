import { Router } from "express";
import { ExpressUserAdapter } from "../../adapters/userAdapter/expressUserAdapter";
import { UserUseCase } from "../../domain/use-cases/UserUseCase";
import { prisma } from "../../infraestructure/PrismaClient";
import { MongoUserRepository } from "../../infraestructure/repositories/MongoUserRepository";
import { UserController } from "../controllers/UserController";
import { authenticateMiddleware } from "../middleware/auth";

const routes = Router();

const prismaInstance = prisma;
const mongoRepo = new MongoUserRepository(prismaInstance);
const userUseCase = new UserUseCase(mongoRepo);
const userController = new UserController(userUseCase);

routes.patch("/:email", authenticateMiddleware, ExpressUserAdapter.updateCpf(userController));
routes.get("/:email", authenticateMiddleware, ExpressUserAdapter.getUserSchedules(userController));

export { routes as userRouter };

