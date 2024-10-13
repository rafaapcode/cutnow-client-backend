import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { logger } from "./infraestructure/logger";
import { errorHandler } from "./presentation/middleware/errorHandler";
import { barberRoutes } from "./presentation/routes/barberRoutes";
import { barbershopRouter } from "./presentation/routes/barbershopRoutes";
import { oauthRoutes } from "./presentation/routes/oauthRoutes";
import { requestRoutes } from "./presentation/routes/requestRoutes";
import { userRouter } from "./presentation/routes/userRoutes";

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use("/auth", oauthRoutes)
app.use("/user", userRouter)
app.use("/barber", barberRoutes)
app.use("/barbershop", barbershopRouter)
app.use("/request", requestRoutes)
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => {
  logger.info("Rodando na porta " + PORT);
});