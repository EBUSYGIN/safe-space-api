import { type Response, Router } from 'express';
import type { IRoute } from './route.types.js';
import type { ILog } from '../logger/logger.types.js';
export declare abstract class BaseController {
    protected logger: ILog;
    private readonly _router;
    constructor(logger: ILog);
    get router(): Router;
    sendError<T>(res: Response, code: number, error: T): void;
    sendSuccess<T>(res: Response, code: number, info: T): void;
    protected bindRoutes(routes: IRoute[]): void;
}
//# sourceMappingURL=base.controller.d.ts.map