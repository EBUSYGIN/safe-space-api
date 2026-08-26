import { Container, ContainerModule } from 'inversify';
import { App } from './app.js';
import { ExceptionFilter } from './common/errors/exception.filter.js';
import type { IExceptionFilter } from './common/errors/exception.filter.types.js';
import { Log } from './common/logger/logger.js';
import type { ILog } from './common/logger/logger.types.js';
import { DITypes } from './DI.types.js';
import { UserController } from './modules/user/user.controller.js';
import type { IUserController } from './modules/user/user.controller.types.js';

export const appBindings = new ContainerModule((options) => {
  options.bind<App>(DITypes.App).to(App);
  options.bind<ILog>(DITypes.ILog).to(Log);
  options.bind<IExceptionFilter>(DITypes.IExceptionFilter).to(ExceptionFilter);
  options.bind<IUserController>(DITypes.IUserController).to(UserController);
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
