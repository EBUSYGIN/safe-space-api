import { Container, ContainerModule } from 'inversify';
import { App } from './app.js';
import { AuthService } from './common/auth/auth.service.js';
import type { IAuthService } from './common/auth/auth.service.types.js';
import { ConfigService } from './common/config/config.service.js';
import type { IConfigService } from './common/config/config.service.types.js';
import { DatabaseService } from './common/database/database.service.js';
import { ExceptionFilter } from './common/errors/exception.filter.js';
import type { IExceptionFilter } from './common/errors/exception.filter.types.js';
import { Log } from './common/logger/logger.js';
import type { ILog } from './common/logger/logger.types.js';
import { DITypes } from './DI.types.js';
import { NoteController } from './modules/note/controller/note.controller.js';
import type { INoteController } from './modules/note/controller/note.controller.types.js';
import { NoteRepository } from './modules/note/repository/note.repository.js';
import type { INoteRepository } from './modules/note/repository/note.repository.types.js';
import { NoteService } from './modules/note/service/note.service.js';
import type { INoteService } from './modules/note/service/note.service.types.js';
import { UserController } from './modules/user/controller/user.controller.js';
import type { IUserController } from './modules/user/controller/user.controller.types.js';
import { UserRepository } from './modules/user/repository/user.repository.js';
import type { IUserRepository } from './modules/user/repository/user.repository.types.js';
import { UserService } from './modules/user/service/user.service.js';
import type { IUserService } from './modules/user/service/user.service.types.js';

export const appBindings = new ContainerModule((options) => {
  options.bind<App>(DITypes.App).to(App);
  options.bind<ILog>(DITypes.ILog).to(Log).inSingletonScope();
  options.bind<IExceptionFilter>(DITypes.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
  options.bind<IUserController>(DITypes.IUserController).to(UserController);
  options.bind<IUserService>(DITypes.IUserService).to(UserService);
  options.bind<IConfigService>(DITypes.IConfigService).to(ConfigService).inSingletonScope();
  options.bind<DatabaseService>(DITypes.IDatabaseService).to(DatabaseService).inSingletonScope();
  options.bind<IUserRepository>(DITypes.IUserRepository).to(UserRepository);
  options.bind<IAuthService>(DITypes.IAuthService).to(AuthService).inSingletonScope();
  options.bind<INoteRepository>(DITypes.INoteRepository).to(NoteRepository).inSingletonScope();
  options.bind<INoteService>(DITypes.INoteService).to(NoteService).inSingletonScope();
  options.bind<INoteController>(DITypes.INoteController).to(NoteController).inSingletonScope();
});

export async function bootstrap() {
  //Creation of container to put dependencies
  //Binding of class to its symbol in the container
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(DITypes.App);
  await app.init();
  return { app, appContainer };
}

export const boot = bootstrap();
