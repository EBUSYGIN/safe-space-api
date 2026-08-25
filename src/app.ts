import type { Express } from 'express';
import express from 'express';
import type { Server } from 'http';
import { Log } from './common/logger.js';
import type { UserController } from './modules/user/user.controller.js';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: Log;
  userController: UserController;

  constructor(logger: Log, userController: UserController) {
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
