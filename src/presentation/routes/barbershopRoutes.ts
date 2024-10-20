import { Router } from "express";
import { ExpressBarbershopAdapter } from "../../adapters/barbershopAdapter/expressBarbershopAdapter";
import { BarbershopUseCase } from "../../domain/use-cases/BarbershopUseCase";
import { prisma } from "../../infraestructure/PrismaClient";
import { MongoBarbershopRepository } from "../../infraestructure/repositories/MongoBarberShopRepository";
import { BarbershopController } from "../controllers/barbershopController";
import { authenticateMiddleware } from "../middleware/auth";

const router = Router();

const prismaIstance = prisma;
const mongoBarbershopRepository = new MongoBarbershopRepository(prismaIstance);
const barbershopUseCase = new BarbershopUseCase(mongoBarbershopRepository);
const barbershopController = new BarbershopController(barbershopUseCase);

router.get("/", authenticateMiddleware, ExpressBarbershopAdapter.getAllBarbershops(barbershopController));
router.get("/:id", authenticateMiddleware, ExpressBarbershopAdapter.getBarbershop(barbershopController));
router.get("/barbers/:id", authenticateMiddleware, ExpressBarbershopAdapter.getAllBarbers(barbershopController));

export { router as barbershopRouter };

