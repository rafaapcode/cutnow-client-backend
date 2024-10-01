import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { MongoUserRepository } from "../../infraestructure/repositories/MongoUserRepository";
import { UserUseCase } from "../../use-cases/UserUseCase";
import { UserController } from "../controllers/UserController";

const router = Router();

const prisma = new PrismaClient();
const mongoUserRepo = new MongoUserRepository(prisma);
const userUseCase = new UserUseCase(mongoUserRepo);
const userController = new UserController(userUseCase);

router.post("/", (req: Request, res: Response) => userController.findByEmail(req,res));
router.post("/user", (req: Request, res: Response) => userController.create(req,res));
router.patch("/user/:email", (req: Request, res: Response) => userController.updateCpf(req,res));

export { router as userRoutes };
