import { type NextFunction, type Request, type Response } from 'express';

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}
