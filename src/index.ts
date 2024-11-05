import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandler } from "./presentation/middleware/errorHandler";
import { barberRoutes } from "./presentation/routes/barberRoutes";
import { barbershopRouter } from "./presentation/routes/barbershopRoutes";
import { oauthRoutes } from "./presentation/routes/oauthRoutes";
import { requestRoutes } from "./presentation/routes/requestRoutes";
import { userRouter } from "./presentation/routes/userRoutes";

const app = express();

app.use(cors({
  origin: ["https://main.dr6upwfovugxo.amplifyapp.com"]
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))
app.use("/auth", oauthRoutes);
app.use("/user", userRouter);
app.use("/barber", barberRoutes);
app.use("/barbershop", barbershopRouter);
app.use("/request", requestRoutes);
app.use(errorHandler);


const PORT = process.env.PORT;
app.listen(PORT, () => {
 console.log("Rodando na porta " + PORT);
});