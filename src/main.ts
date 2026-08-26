import { App } from './app.js';
import { ExceptionFilter } from './common/errors/exception.filter.js';
import { Log } from './common/logger/logger.js';
import { UserController } from './modules/user/user.controller.js';

async function bootstrap() {
  const app = new App(
    new Log(),
    new UserController(new Log()),
    new ExceptionFilter(new Log()),
  );
  await app.init();
}

await bootstrap();
