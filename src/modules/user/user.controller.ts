import { type NextFunction, type Request, type Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base-controller/base.controller.js';
import { HttpError } from '../../common/errors/http-error.js';
import type { ILog } from '../../common/logger/logger.types.js';
import { ValidateMiddleware } from '../../common/middleware/validate.middleware.js';
import { DITypes } from '../../DI.types.js';
import { UserLoginDto, UserRegisterDto } from './dto/user.dto.js';
import type { IUserController } from './user.controller.types.js';
import type { IUserService } from './user.service.types.js';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(DITypes.ILog) logger: ILog,
    @inject(DITypes.IUserService) private userService: IUserService,
  ) {
    super(logger);
    this.bindRoutes([
      {
        path: '/login',
        method: 'post',
        function: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/register',
        method: 'post',
        function: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
    ]);
  }

  async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    const existingUser = await this.userService.validateUser(body);
    if (!existingUser) {
      return next(new HttpError(404, 'Ошибка авторизации пользователя', 'UserController'));
    }
    return this.sendSuccess(res, 200, {
      message: 'Пользователь успешно авторизован',
      user: existingUser,
    });
  }

  async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
    const newUser = await this.userService.createUser(body);
    if (!newUser) {
      return next(
        new HttpError(
          422,
          'Ошибка регистрации пользователя, такой уже существует',
          'UserController',
        ),
      );
    }
    return this.sendSuccess(res, 201, {
      message: 'Пользователь успешно зарегистрирован',
      user: newUser,
    });
  }
}
