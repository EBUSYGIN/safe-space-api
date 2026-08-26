import { type Response, Router } from 'express';
import type { Log } from '../logger/logger.js';
import type { IRoute } from './route.interface.js';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(protected logger: Log) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  sendError<T>(res: Response, code: number, error: T) {
    res.status(code).json(error);
  }

  sendSuccess<T>(res: Response, code: number, info: T) {
    res.status(code).json(info);
  }

  protected bindRoutes(routes: IRoute[]) {
    for (const route of routes) {
      this.logger.info(`[${route.method}] ${route.path}`);
      this._router[route.method](route.path, route.function.bind(this));
    }
  }
}
