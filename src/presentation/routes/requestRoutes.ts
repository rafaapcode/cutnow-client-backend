import { Router } from "express";
import { ExpressRequestAdapter } from "../../adapters/requestAdapter/expressRequestAdpater";
import { RequestUseCase } from "../../domain/use-cases/RequestsUseCase";
import { prisma } from "../../infraestructure/PrismaClient";
import { MongoRequestRepository } from "../../infraestructure/repositories/MongoRequestRepository";
import { RequestValidator } from "../../infraestructure/validators/RequestsValidator";
import { RequestController } from "../controllers/requestController";
import { authenticateMiddleware } from "../middleware/auth";

const router = Router();

const prismaInstance = prisma;
const requestRepository = new MongoRequestRepository(prismaInstance);
const requestValidator = new RequestValidator();
const requestUseCase = new RequestUseCase(requestRepository, requestValidator);
const requestController = new RequestController(requestUseCase);

router.post(
  "/",
  authenticateMiddleware,
  ExpressRequestAdapter.create(requestController)
);
router.delete(
  "/:id",
  authenticateMiddleware,
  ExpressRequestAdapter.delete(requestController)
);

export { router as requestRoutes };

