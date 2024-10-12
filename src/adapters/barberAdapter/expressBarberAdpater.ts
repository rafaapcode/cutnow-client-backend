import { Request, Response } from "express";
import { IBarberAdapter } from "./IBarberAdapter";

export class ExpressBarberAdapter {
  static getBarber(router: IBarberAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        params: req.params
      }
      const { data, statusCode } = await router.getBarber(request);

      res.status(statusCode).json(data);
    }
  }

  static getAllSchedules(router: IBarberAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        query: req.query
      }
      const { data, statusCode } = await router.getAllSchedules(request);

      res.status(statusCode).json(data);
    }
  }

  static getAllRequests(router: IBarberAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        params: req.params
      }
      const { data, statusCode } = await router.getAllRequests(request);

      res.status(statusCode).json(data);
    }
  }
}