import { type RequestHandler, Router } from 'express';
import type { IMiddleware } from '../middleware/middleware.interface.js';

export interface IRoute {
  path: string;
  function: RequestHandler;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  middlewares?: IMiddleware[];
}
