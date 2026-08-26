import type { Express } from 'express';
import type { Server } from 'http';
import { Log } from './common/logger/logger.js';
import type { UserController } from './modules/user/user.controller.js';
import type { IExceptionFilter } from './common/errors/exception.filter.interface.js';
export declare class App {
    app: Express;
    port: number;
    server: Server;
    logger: Log;
    userController: UserController;
    exceptionFilter: IExceptionFilter;
    constructor(logger: Log, userController: UserController, exceptionFilter: IExceptionFilter);
    useRoutes(): void;
    useExceptionFilters(): void;
    init(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map