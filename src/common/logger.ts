import { Logger, type ILogObj } from 'tslog';

export class Log {
  logger: Logger<ILogObj>;
  loggerTemplate: string =
    '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ';

  constructor() {
    this.logger = new Logger<ILogObj>({
      prettyLogTemplate: this.loggerTemplate,
      prettyLogTimeZone: 'local',
    });
  }

  info(...args: unknown[]) {
    this.logger.info(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }
}
