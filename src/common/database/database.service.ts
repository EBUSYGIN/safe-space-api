import { inject, injectable } from 'inversify';
import { DITypes } from '../../DI.types.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import type { ILog } from '../logger/logger.types.js';

@injectable()
export class DatabaseService {
  client: PrismaClient;

  constructor(@inject(DITypes.ILog) private logger: ILog) {
    this.client = new PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();
      this.logger.info(`[DatabaseService] : Успешное подключение к бд`);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`[DatabaseService] : Ошибка подключения к бд: ${e.message}`);
      }
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
