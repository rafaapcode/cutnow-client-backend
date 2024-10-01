import express from "express";
import { errorHandler } from "./interface/middleware/errorHandler";
import { userRoutes } from "./interface/routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/", userRoutes);
app.use(errorHandler);


const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});