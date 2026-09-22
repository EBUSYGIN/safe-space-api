import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../../common/base-controller/base.controller.js';
import type { ILog } from '../../../common/logger/logger.types.js';
import { DITypes } from '../../../DI.types.js';

@injectable()
export class NoteController extends BaseController {
  constructor(@inject(DITypes.ILog) logger: ILog) {
    super(logger);
    this.bindRoutes([
      {
        method: 'post',
        path: '/create',
        function: this.createNote,
      },
    ]);
  }

  createNote(_req: Request, _res: Response, _next: NextFunction) {
    return this.sendSuccess(_res, 200, { message: 'Note created successfully' });
  }
}
