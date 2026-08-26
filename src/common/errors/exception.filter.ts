import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { DITypes } from '../../DI.types.js';
import type { ILog } from '../logger/logger.types.js';
import type { IExceptionFilter } from './exception.filter.types.js';
import { HttpError } from './http-error.js';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(DITypes.ILog) private logger: ILog) {}

  catch(
    err: Error | HttpError,
    request: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof HttpError) {
      this.logger.error(
        `Ошибка ${err.statusCode} : ${err.message}, ${err?.context}`,
      );
      return res.status(err.statusCode).json({ error: err.message });
    } else {
      this.logger.error(`Ошибка ${err.message} `);
      return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }
}
