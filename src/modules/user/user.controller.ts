import { type NextFunction, type Request, type Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base-controller/base.controller.js';
import { HttpError } from '../../common/errors/http-error.js';
import type { ILog } from '../../common/logger/logger.types.js';
import { DITypes } from '../../DI.types.js';
import type { IUserController } from './user.controller.types.js';

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

  login(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'logged in' });
  }

  register(req: Request, res: Response, next: NextFunction) {
    // return res.status(200).json({ message: 'registered' });
    next(
      new HttpError(
        404,
        'Ошибка регистрации повторите позже',
        'UserController',
      ),
    );
  }
}
