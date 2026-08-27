import { type NextFunction, type Request, type Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base-controller/base.controller.js';
import { HttpError } from '../../common/errors/http-error.js';
import type { ILog } from '../../common/logger/logger.types.js';
import { DITypes } from '../../DI.types.js';
import type { IUserController } from './user.controller.types.js';

class User {}
const users = [];

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(DITypes.ILog) logger: ILog) {
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

  login(_req: Request, res: Response, _next: NextFunction) {
    users.push(new User());
    return res.status(200).json({ message: 'logged in' });
  }

  register(_req: Request, _res: Response, next: NextFunction) {
    // return res.status(200).json({ message: 'registered' });
    next(new HttpError(404, 'Ошибка регистрации повторите позже', 'UserController'));
  }
}
