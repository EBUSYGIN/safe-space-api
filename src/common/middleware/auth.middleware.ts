import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { IConfigService } from '../config/config.service.types.js';
import type { IMiddleware } from './middleware.interface.js';

export class AuthMiddleware implements IMiddleware {
  constructor(private configService: IConfigService) {}

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
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return next();
      }

      if (typeof payload === 'object' && payload && 'email' in payload) {
        req.user = String(payload.email);
        return next();
      }

      return next();
    });
  }
}
