import { plainToClass, type ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from './middleware.interface.js';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction) {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
