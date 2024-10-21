import { Router } from "express";
import { ExpressBarberAdapter } from "../../adapters/barberAdapter/expressBarberAdpater";
import { BarberUseCase } from "../../domain/use-cases/BarberUseCase";
import { prisma } from "../../infraestructure/PrismaClient";
import { MongoBarberRepositor } from "../../infraestructure/repositories/MongoBarberRepository";
import { BarberController } from "../controllers/barberController";
import { authenticateMiddleware } from "../middleware/auth";

const router = Router();

const prismaInstance = prisma;
const barberRepository = new MongoBarberRepositor(prismaInstance);
const barberUseCase = new BarberUseCase(barberRepository);
const barberController = new BarberController(barberUseCase);

router.get("/:id", authenticateMiddleware, ExpressBarberAdapter.getBarber(barberController));

export { router as barberRoutes };

