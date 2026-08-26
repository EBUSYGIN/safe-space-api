import { Container, ContainerModule } from 'inversify';
import { App } from './app.js';
import { ExceptionFilter } from './common/errors/exception-filter.js';
import { Log } from './common/logger/logger.js';
import { DITypes } from './DI.types.js';
import { UserController } from './modules/user/user.controller.js';
export const appBindings = new ContainerModule((options) => {
    options.bind(DITypes.App).to(App);
    options.bind(DITypes.ILog).to(Log);
    options.bind(DITypes.IExceptionFilter).to(ExceptionFilter);
    options.bind(DITypes.IUserController).to(UserController);
});
async function bootstrap() {
    //Creation of container to put dependencies
    //Binding of class to its symbol in the container
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get(DITypes.App);
    await app.init();
}
await bootstrap();
//# sourceMappingURL=main.js.map