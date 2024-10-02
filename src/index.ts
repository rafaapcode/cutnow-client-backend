import express from "express";
import { errorHandler } from "./interface/middleware/errorHandler";
import { oauthRoutes } from "./interface/routes/oauthRoutes";

const app = express();

app.use(express.json());
app.use("/auth", oauthRoutes)
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});