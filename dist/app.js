import express from 'express';
import { Log } from './common/logger.js';
export class App {
    app;
    port;
    server;
    logger;
    userController;
    constructor(logger, userController) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
    }
    useRoutes() {
        this.app.use('/user', this.userController.router);
    }
    async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.info(`Server started on http://localhost:${this.port}`);
    }
}
//# sourceMappingURL=app.js.map