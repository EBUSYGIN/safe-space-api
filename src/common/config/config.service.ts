import { config, type DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { DITypes } from '../../DI.types.js';
import type { ILog } from '../logger/logger.types.js';
import type { IConfigService } from './config.service.types.js';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(DITypes.ILog) private logger: ILog) {
    const result = config();
    if (result.error) {
      this.logger.error('[ConfigService] : Не удалось прочитать .env файл или он отсутствует');
    } else {
      this.logger.info('[ConfigService] : Загружена конфигурация .env');
      this.config = result.parsed as DotenvParseOutput;
    }
  }

  get(key: string) {
    const value = this.config[key];
    if (!value) return null;
    return value;
  }
}
