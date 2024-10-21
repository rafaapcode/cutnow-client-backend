import { Request, Response } from "express";
import { IBarbershopAdapter } from "./IBarbershopAdapter";

export class ExpressBarbershopAdapter {
  static getAllBarbershops(router: IBarbershopAdapter) {
    return async (req: Request, res: Response) => {
      const { body, statusCode } = await router.getAllBarbershops();
      res.status(statusCode).json(body);
    };
  }
  static getBarbershop(router: IBarbershopAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        params: req.params,
      };

      const { body, statusCode } = await router.getBarbershop(request);
      res.status(statusCode).json(body);
    };
  }
  static getAllBarbers(router: IBarbershopAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        params: req.params,
      };

      const { body, statusCode } = await router.getAllBarbers(request);
      res.status(statusCode).json(body);
    };
  }
  static getBarbershopByName(router: IBarbershopAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        query: req.query,
      };

      const { body, statusCode } = await router.getBarbershopByName(request);
      res.status(statusCode).json(body);
    };
  }
  static getServicesType(router: IBarbershopAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        params: req.params,
      };

      const { body, statusCode } = await router.getServiceType(request);
      res.status(statusCode).json(body);
    };
  }
}
