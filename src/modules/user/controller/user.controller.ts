import { type NextFunction, type Request, type Response } from 'express';
import { inject, injectable } from 'inversify';
import type { IAuthService } from '../../../common/auth/auth.service.types.js';
import { BaseController } from '../../../common/base-controller/base.controller.js';
import type { IConfigService } from '../../../common/config/config.service.types.js';
import { HttpError } from '../../../common/errors/http-error.js';
import type { ILog } from '../../../common/logger/logger.types.js';
import { AuthMiddleware } from '../../../common/middleware/auth.middleware.js';
import { ValidateMiddleware } from '../../../common/middleware/validate.middleware.js';
import { DITypes } from '../../../DI.types.js';
import { UserLoginDto, UserRegisterDto } from '../dto/user.dto.js';
import type { IUserService } from '../service/user.service.types.js';
import type { IUserController } from './user.controller.types.js';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(DITypes.ILog) logger: ILog,
    @inject(DITypes.IUserService) private userService: IUserService,
    @inject(DITypes.IConfigService) private configService: IConfigService,
    @inject(DITypes.IAuthService) private authService: IAuthService,
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
        middlewares: [new AuthMiddleware(this.configService, this.authService, 'access')],
      },
      {
        path: '/refresh',
        method: 'get',
        function: this.refresh,
        middlewares: [new AuthMiddleware(this.configService, this.authService, 'refresh')],
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

    const accessToken = await this.authService.createAccessToken({
      sub: existingUser.id,
      email: existingUser.email,
    });

    const refreshToken = await this.authService.createRefreshToken({
      sub: existingUser.id,
      email: existingUser.email,
    });

    return this.sendSuccess(res, 200, {
      message: 'Пользователь успешно авторизован',
      accessToken,
      refreshToken,
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

    const accessToken = await this.authService.createAccessToken({
      sub: newUser.id,
      email: newUser.email,
    });

    const refreshToken = await this.authService.createRefreshToken({
      sub: newUser.id,
      email: newUser.email,
    });

    return this.sendSuccess(res, 201, {
      message: 'Пользователь успешно зарегистрирован',
      user: newUser,
      accessToken,
      refreshToken,
    });
  }

  async getUserInfo({ userId }: Request, res: Response, next: NextFunction) {
    if (!userId) {
      return next(new HttpError(401, 'Пользователь не авторизован', 'UserController'));
    }
    const userInfo = await this.userService.getUserInfo(userId);
    return this.sendSuccess(res, 200, {
      message: 'Информация о пользователе',
      user: userInfo,
    });
  }

  async refresh({ userId }: Request, res: Response, next: NextFunction) {
    if (!userId) {
      return next(new HttpError(401, 'Пользователь не авторизован', 'UserController'));
    }
    const foundUser = await this.userService.getUserInfo(userId);
    if (!foundUser) {
      return next(new HttpError(404, 'Пользователь не найден', 'UserController'));
    }
    const newAccessToken = await this.authService.createAccessToken({
      sub: foundUser.id,
      email: foundUser.email,
    });
    return this.sendSuccess(res, 200, {
      message: 'Токен успешно обновлен',
      accessToken: newAccessToken,
    });
  }
}
