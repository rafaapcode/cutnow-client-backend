import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
 try {
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token) {
    res.status(401).json({message: "Token is required"});
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string);

  if(!verifiedToken) {
    res.status(401).json({message: "Token invalido"});
    return;
  }

  next();
 } catch (error) {
    res.status(500).json({message: "Ocorreu um erro no seu login , entre em contato com o suporte."});
    return;
 }

} 