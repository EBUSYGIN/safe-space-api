import { inject } from 'inversify';
import type { DatabaseService } from '../../common/database/database.service.js';
import { DITypes } from '../../DI.types.js';
import type { User } from './entity/user.entity.js';
import type { IUserRepository } from './user.repository.types.js';

export class UserRepository implements IUserRepository {
  constructor(
    @inject(DITypes.IDatabaseService) private readonly databaseService: DatabaseService,
  ) {}

  async createUser({ email, password, name }: User) {
    const newUser = await this.databaseService.client.userModel.create({
      data: {
        email,
        password,
        name,
      },
      omit: {
        password: true,
      },
    });
    return newUser;
  }

  async findUserByEmail(email: string) {
    const user = await this.databaseService.client.userModel.findUnique({
      where: {
        email,
      },
      omit: {
        password: true,
      },
    });
    return user;
  }

  async findUserByEmailForAuth(email: string) {
    const user = await this.databaseService.client.userModel.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
