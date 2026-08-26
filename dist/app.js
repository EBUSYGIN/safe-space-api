import express from 'express';
import { Log } from './common/logger/logger.js';
export class App {
    app;
    port;
    server;
    logger;
    userController;
    exceptionFilter;
    constructor(logger, userController, exceptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }
    useRoutes() {
        this.app.use('/user', this.userController.router);
    }
    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.info(`Server started on http://localhost:${this.port}`);
    }
}
//# sourceMappingURL=app.js.map