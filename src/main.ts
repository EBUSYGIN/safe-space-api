import { Container, ContainerModule } from 'inversify';
import { App } from './app.js';
import { ConfigService } from './common/config/config.service.js';
import type { IConfigService } from './common/config/config.service.types.js';
import { DatabaseService } from './common/database/database.service.js';
import { ExceptionFilter } from './common/errors/exception.filter.js';
import type { IExceptionFilter } from './common/errors/exception.filter.types.js';
import { Log } from './common/logger/logger.js';
import type { ILog } from './common/logger/logger.types.js';
import { DITypes } from './DI.types.js';
import { UserController } from './modules/user/user.controller.js';
import type { IUserController } from './modules/user/user.controller.types.js';
import { UserRepository } from './modules/user/user.repository.js';
import type { IUserRepository } from './modules/user/user.repository.types.js';
import { UserService } from './modules/user/user.service.js';
import type { IUserService } from './modules/user/user.service.types.js';

export const appBindings = new ContainerModule((options) => {
  options.bind<App>(DITypes.App).to(App);
  options.bind<ILog>(DITypes.ILog).to(Log).inSingletonScope();
  options.bind<IExceptionFilter>(DITypes.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  options.bind<IUserController>(DITypes.IUserController).to(UserController);
  options.bind<IUserService>(DITypes.IUserService).to(UserService);
  options.bind<IConfigService>(DITypes.IConfigService).to(ConfigService).inSingletonScope();
  options.bind<DatabaseService>(DITypes.IDatabaseService).to(DatabaseService).inSingletonScope();
  options.bind<IUserRepository>(DITypes.IUserRepository).to(UserRepository);
});

async function bootstrap() {
  //Creation of container to put dependencies
  //Binding of class to its symbol in the container
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(DITypes.App);
  await app.init();
}

await bootstrap();
