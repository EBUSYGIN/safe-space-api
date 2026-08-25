import { type Response, type Request, type NextFunction } from 'express';
import { BaseController } from '../../common/base-controller/base.controller.js';
import type { Log } from '../../common/logger.js';

export class UserController extends BaseController {
  constructor(logger: Log) {
    super(logger);
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        function: this.login,
      },
      {
        path: '/register',
        method: 'post',
        function: this.register,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'logged in' });
  }

  register(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'registered' });
  }
}
