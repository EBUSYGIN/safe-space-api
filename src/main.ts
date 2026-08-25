import { App } from './app.js';
import { Log } from './common/logger.js';
import { UserController } from './modules/user/user.controller.js';

async function bootstrap() {
  const app = new App(new Log(), new UserController(new Log()));
  await app.init();
}

await bootstrap();
