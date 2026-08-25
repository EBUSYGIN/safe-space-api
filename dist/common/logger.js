import { Logger } from 'tslog';
export class Log {
    logger;
    loggerTemplate = '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ';
    constructor() {
        this.logger = new Logger({
            prettyLogTemplate: this.loggerTemplate,
            prettyLogTimeZone: 'local',
        });
    }
    info(...args) {
        this.logger.info(...args);
    }
    warn(...args) {
        this.logger.warn(...args);
    }
    error(...args) {
        this.logger.error(...args);
    }
}
//# sourceMappingURL=logger.js.map