import { type NextFunction, type Request, type Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../common/base-controller/base.controller.js';
import type { IConfigService } from '../../common/config/config.service.types.js';
import { HttpError } from '../../common/errors/http-error.js';
import type { ILog } from '../../common/logger/logger.types.js';
import { AuthMiddleware } from '../../common/middleware/auth.middleware.js';
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
    @inject(DITypes.IConfigService) private configService: IConfigService,
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
      {
        path: '/info',
        method: 'get',
        function: this.getUserInfo,
        middlewares: [new AuthMiddleware(this.configService)],
      },
    ]);
  }

  async login({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    const existingUser = await this.userService.validateUser(body);
    if (!existingUser) {
      return next(new HttpError(404, 'Ошибка авторизации пользователя', 'UserController'));
    }

    const secret = this.configService.get('secret');
    if (!secret) {
      return next(new HttpError(404, 'Ошибка авторизации пользователя', 'UserController'));
    }

    const jwt = await this.userService.signToken(existingUser.email, secret);

    return this.sendSuccess(res, 200, {
      message: 'Пользователь успешно авторизован',
      token: jwt,
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

  async getUserInfo({ user }: Request, res: Response, next: NextFunction) {
    if (!user) {
      return next(new HttpError(401, 'Пользователь не авторизован', 'UserController'));
    }
    const userInfo = await this.userService.getUserInfo(user);
    return this.sendSuccess(res, 200, {
      message: 'Информация о пользователе',
      user: userInfo,
    });
  }
}
