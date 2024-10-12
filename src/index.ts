import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { logger } from "./infraestructure/logger";
import { errorHandler } from "./presentation/middleware/errorHandler";
import { oauthRoutes } from "./presentation/routes/oauthRoutes";
import { updateCpfRouter } from "./presentation/routes/userRoutes";

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use("/auth", oauthRoutes)
app.use("/user", updateCpfRouter)
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => {
  logger.info("Rodando na porta " + PORT);
});