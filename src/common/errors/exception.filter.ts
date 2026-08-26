import type { NextFunction, Request, Response } from 'express';
import type { Log } from '../logger/logger.js';
import type { IExceptionFilter } from './exception.filter.interface.js';
import { HttpError } from './http-error.js';

export class ExceptionFilter implements IExceptionFilter {
  logger: Log;
  constructor(logger: Log) {
    this.logger = logger;
  }

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
