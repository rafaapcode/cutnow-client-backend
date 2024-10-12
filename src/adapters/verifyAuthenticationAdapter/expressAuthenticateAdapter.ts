import { Request, Response } from "express";
import { IVerificationAdapter } from "./IVerificationAdapter";

export class ExpressAuthenticateAdapter {
  static isAuth(router: IVerificationAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        token: req.cookies.token
      }

      const { body, statusCode } = await router.isAuth(request);
      
      res.status(statusCode).json(body);
    }
  }
};