import type { Express } from 'express';
import express from 'express';
import type { Server } from 'http';
import { inject, injectable } from 'inversify';
import { DITypes } from './DI.types.js';
import type { IConfigService } from './common/config/config.service.types.js';
import type { DatabaseService } from './common/database/database.service.js';
import type { IExceptionFilter } from './common/errors/exception.filter.types.js';
import type { ILog } from './common/logger/logger.types.js';
import type { UserController } from './modules/user/user.controller.js';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(DITypes.ILog) private logger: ILog,
    @inject(DITypes.IUserController) private userController: UserController,
    @inject(DITypes.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(DITypes.IConfigService) private configService: IConfigService,
    @inject(DITypes.IDatabaseService) private databaseService: DatabaseService,
  ) {
    this.app = express();
    this.port = Number(this.configService.get('port'));
  }

  useRoutes() {
    this.app.use('/user', this.userController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  useParsers() {
    this.app.use(express.json());
  }

  async init() {
    this.useParsers();
    this.useRoutes();
    this.useExceptionFilters();
    await this.databaseService.connect();
    this.server = this.app.listen(this.port);
    this.logger.info(`Server started on http://localhost:${this.port}`);
  }
}
