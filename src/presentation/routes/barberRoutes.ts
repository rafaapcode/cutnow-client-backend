import { Router } from "express";
import { ExpressBarberAdapter } from "../../adapters/barberAdapter/expressBarberAdpater";
import { BarberUseCase } from "../../domain/use-cases/BarberUseCase";
import { prisma } from "../../infraestructure/PrismaClient";
import { MongoBarberRepositor } from "../../infraestructure/repositories/MongoBarberRepository";
import { BarberController } from "../controllers/barberController";

const router = Router();

const prismaInstance = prisma;
const barberRepository = new MongoBarberRepositor(prismaInstance);
const barberUseCase = new BarberUseCase(barberRepository);
const barberController = new BarberController(barberUseCase);

router.get("/:id", ExpressBarberAdapter.getBarber(barberController));
router.get("/", ExpressBarberAdapter.getAllRequests(barberController));
router.get("/requests/:id", ExpressBarberAdapter.getAllRequests(barberController));

export { router as barberRoutes };

