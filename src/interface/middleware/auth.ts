import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../../infraestructure/logger";

export function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    logger.info("Token", token);
    if (!token) {
      logger.info("token dont exsits", token);
      res.status(401).json({ message: "Token is required" });
      return;
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    logger.info("Token payload", verifiedToken);
    if (!verifiedToken) {
      logger.info("Token verified dont exist", verifiedToken);
      res.status(401).json({ message: "Token invalido" });
      return;
    }

    next();
  } catch (error: any) {
    logger.info("Error in the middleware", error.message);
    res
      .status(500)
      .json({
        message:
          "Ocorreu um erro no seu login , entre em contato com o suporte.",
      });
    return;
  }
}
