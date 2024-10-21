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

}