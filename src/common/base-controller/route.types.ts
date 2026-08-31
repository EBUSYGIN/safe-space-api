import { type NextFunction, type Request, type Response, Router } from 'express';
import type { IMiddleware } from '../middleware/middleware.interface.js';

export interface IRoute {
  path: string;
  function: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  middlewares?: IMiddleware[];
}
