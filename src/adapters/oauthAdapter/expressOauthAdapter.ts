import { Request, Response } from "express";
import { IOAuthAdapter } from "./IOauthAdapter";

export class ExpressOauthAdapter {
  static signIn(route: IOAuthAdapter) {
    return async (req: Request, res: Response) => {
      const request = {
        data: req.body
      }
      const { body, statusCode } = await route.signIn(request);
      res.status(statusCode).json(body);
    }
  }
};