import type { NextFunction, Request, Response } from 'express';
import type { IAuthService } from '../auth/auth.service.types.js';
import type { IConfigService } from '../config/config.service.types.js';
import type { IMiddleware } from './middleware.interface.js';

export class AuthMiddleware implements IMiddleware {
  private tokenVerificationType: 'access' | 'refresh';
  constructor(
    private configService: IConfigService,
    private authService: IAuthService,
    type: 'access' | 'refresh' = 'access',
  ) {
    this.tokenVerificationType = type;
  }

  execute(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    const secret = this.configService.get('secret');
    if (!secret) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }

    const result = this.authService.verifyToken(token, this.tokenVerificationType, secret);
    if (!result) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    if (typeof result.sub !== 'string' || typeof result.email !== 'string') {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    req.user = result.email;
    next();
  }
}
