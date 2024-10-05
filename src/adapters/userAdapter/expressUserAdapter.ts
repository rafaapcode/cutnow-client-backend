import { Request, Response } from "express";
import { IUserAdapter } from "./IUserAdapter";

export class ExpressUserAdapter {
  static updateCpf(router: IUserAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        data: req.body,
        params: req.params
      }

      const { body, statusCode } = await router.updateCpf(request);
      
      res.status(statusCode).json(body);
    }
  }
};