import { Request, Response } from "express";
import { IRequestAdapter } from "./IRequestAdapter";

export class ExpressRequestAdapter {
  static create(router: IRequestAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        body: req.body,
      };

      const { data, statusCode } = await router.create(request);

      res.status(statusCode).json(data);
    };
  }

  static delete(router: IRequestAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        params: req.params
      }

      const {statusCode, data} = await router.delete(request);

      res.status(statusCode).json(data);
    };
  }
}
