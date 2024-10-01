import { NextFunction, Request, Response } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  res.status(500).json({ message: "Internal server Error" });
}