import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { MongoUserRepository } from "../../infraestructure/repositories/MongoUserRepository";
import { UserUseCase } from "../../use-cases/UserUseCase";
import { UserController } from "../controllers/UserController";

const routes = Router();

const prisma = new PrismaClient();
const mongoRepo = new MongoUserRepository(prisma);
const userUseCase = new UserUseCase(mongoRepo);
const userController = new UserController(userUseCase);

routes.patch("/:email", (req: Request, res: Response) =>
  userController.updateCpf(req, res)
);

export { routes as updateCpfRouter };

