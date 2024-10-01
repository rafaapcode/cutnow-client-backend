import express from "express";
import { userRoutes } from "./interface/routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
});