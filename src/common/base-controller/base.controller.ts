import { type Response, Router } from 'express';
import { injectable } from 'inversify';
import type { ILog } from '../logger/logger.types.js';
import type { IRoute } from './route.types.js';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(protected logger: ILog) {
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
      const handler = route.function.bind(this);
      const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
      const pipeline = middlewares ? [...middlewares, handler] : handler;
      this._router[route.method](route.path, pipeline);
    }
  }
}
