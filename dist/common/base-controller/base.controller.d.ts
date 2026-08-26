import { type Response, Router } from 'express';
import type { Log } from '../logger/logger.js';
import type { IRoute } from './route.interface.js';
export declare abstract class BaseController {
    protected logger: Log;
    private readonly _router;
    constructor(logger: Log);
    get router(): Router;
    sendError<T>(res: Response, code: number, error: T): void;
    sendSuccess<T>(res: Response, code: number, info: T): void;
    protected bindRoutes(routes: IRoute[]): void;
}
//# sourceMappingURL=base.controller.d.ts.map