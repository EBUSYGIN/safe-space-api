import type { Express } from 'express';
import express from 'express';
import type { Server } from 'http';
import { Log } from './common/logger/logger.js';
import type { UserController } from './modules/user/user.controller.js';
import type { IExceptionFilter } from './common/errors/exception.filter.interface.js';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: Log;
  userController: UserController;
  exceptionFilter: IExceptionFilter;

  constructor(
    logger: Log,
    userController: UserController,
    exceptionFilter: IExceptionFilter,
  ) {
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
