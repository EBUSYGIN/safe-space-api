import { type Response, type Request, type NextFunction } from 'express';
import { BaseController } from '../../common/base-controller/base.controller.js';
import type { ILog } from '../../common/logger/logger.types.js';
export declare class UserController extends BaseController {
    constructor(logger: ILog);
    login(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
    register(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=user.controller.d.ts.map