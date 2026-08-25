import type { Express } from 'express';
import type { Server } from 'http';
import { Log } from './common/logger.js';
import type { UserController } from './modules/user/user.controller.js';
export declare class App {
    app: Express;
    port: number;
    server: Server;
    logger: Log;
    userController: UserController;
    constructor(logger: Log, userController: UserController);
    useRoutes(): void;
    init(): Promise<void>;
}
//# sourceMappingURL=app.d.ts.map