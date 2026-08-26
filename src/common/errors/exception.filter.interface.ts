import type { NextFunction, Request, Response } from 'express';

export interface IExceptionFilter {
  catch: (
    err: Error,
    request: Request,
    res: Response,
    next: NextFunction,
  ) => void;
}
