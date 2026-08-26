import type { Express } from 'express';
import type { Server } from 'http';
import type { IExceptionFilter } from './common/errors/exception-filter.types.js';
import type { ILog } from './common/logger/logger.types.js';
import type { UserController } from './modules/user/user.controller.js';
export declare class App {
    private logger;
    private userController;
    private exceptionFilter;
    app: Express;
    port: number;
    server: Server;
    constructor(logger: ILog, userController: UserController, exceptionFilter: IExceptionFilter);
    useRoutes(): void;
    useExceptionFilters(): void;
    init(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map