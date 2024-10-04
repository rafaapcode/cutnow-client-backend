import cors from "cors";
import express from "express";
import { logger } from "./infraestructure/logger";
import { errorHandler } from "./interface/middleware/errorHandler";
import { oauthRoutes } from "./interface/routes/oauthRoutes";

const app = express();

app.use(cors())
app.use(express.json());
app.use("/auth", oauthRoutes)
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => {
  logger.info("Rodando na porta " + PORT);
});