import { Logger, type ILogObj } from 'tslog';
export declare class Log {
    logger: Logger<ILogObj>;
    loggerTemplate: string;
    constructor();
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
//# sourceMappingURL=logger.d.ts.map