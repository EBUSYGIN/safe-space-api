import { inject, injectable } from '@inversifyjs/core';
import jwt from 'jsonwebtoken';
import { DITypes } from '../../DI.types.js';
import type { IConfigService } from '../config/config.service.types.js';
import type { ILog } from '../logger/logger.types.js';
import type { IAuthService } from './auth.service.types.js';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(DITypes.IConfigService) private configService: IConfigService,
    @inject(DITypes.ILog) private loggerService: ILog,
  ) {}

  createAccessToken(payload: Record<string, unknown>): Promise<string | null> {
    return this.signToken(payload, {
      algorithm: 'HS256',
      expiresIn: '15m',
      audience: 'access',
    });
  }

  createRefreshToken(payload: Record<string, unknown>): Promise<string | null> {
    return this.signToken(
      { ...payload, tokenType: 'refresh' },
      {
        algorithm: 'HS256',
        expiresIn: '30d',
        audience: 'refresh',
      },
    );
  }

  private signToken(
    payload: Record<string, unknown>,
    options: jwt.SignOptions,
  ): Promise<string | null> {
    const secret = this.configService.get('secret');
    const tokenPayload = {
      ...payload,
      iat: Math.floor(Date.now() / 1000),
    };

    return new Promise((resolve, reject) => {
      if (!secret) {
        this.loggerService.error('[AuthService] Secret key is not defined');
        return reject(null);
      }

      jwt.sign(tokenPayload, secret, options, (err, token) => {
        if (err) {
          this.loggerService.error(`[AuthService] Error signing token: ${err.message}`);
          return reject(err);
        }
        resolve(token as string);
      });
    });
  }
}
