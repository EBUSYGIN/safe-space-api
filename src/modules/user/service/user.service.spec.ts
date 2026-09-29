import { Container } from 'inversify';
import type { Mocked } from 'vitest';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { IConfigService } from '../../../common/config/config.service.types.js';
import { DITypes } from '../../../DI.types.js';
import { User } from '../entity/user.entity.js';
import type { IUserRepository } from '../repository/user.repository.types.js';
import { UserService } from './user.service.js';
import type { IUserService, UserWithoutPassword } from './user.service.types.js';

const ConfigServiceMock: Mocked<IConfigService> = {
  get: vi.fn(),
};

const UserRepositoryMock: Mocked<IUserRepository> = {
  createUser: vi.fn(),
  findUserByEmail: vi.fn(),
  findUserById: vi.fn(),
  findUserByEmailForAuth: vi.fn(),
};

const container = new Container();
let configService: IConfigService;
let userRepository: IUserRepository;
let userService: IUserService;

let createdUser: UserWithoutPassword | null = null;

beforeAll(() => {
  container.bind<IUserService>(DITypes.IUserService).to(UserService);
  container.bind<IConfigService>(DITypes.IConfigService).toConstantValue(ConfigServiceMock);
  container.bind<IUserRepository>(DITypes.IUserRepository).toConstantValue(UserRepositoryMock);

  configService = container.get<IConfigService>(DITypes.IConfigService);
  userRepository = container.get<IUserRepository>(DITypes.IUserRepository);
  userService = container.get<IUserService>(DITypes.IUserService);
});

describe('User Service', () => {
  it('createUser', async () => {
    configService.get = vi.fn<(key: string) => string | null>().mockReturnValueOnce('10');
    userRepository.createUser = vi
      .fn<IUserRepository['createUser']>()
      .mockImplementationOnce(async (user: User) => ({
        id: '1',
        email: user.email,
        name: user.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    createdUser = await userService.createUser({
      email: 'a@a.ru',
      name: 'Anna',
      password: 'hashpass1234',
    });

    expect(createdUser?.id).toEqual('1');
    expect(createdUser?.email).toEqual('a@a.ru');
  });

  it('validate user success', async () => {
    const user = new User('a@a.ru', 'Anna');
    await user.setPassword('1', 10);

    userRepository.findUserByEmailForAuth = vi
      .fn<IUserRepository['findUserByEmailForAuth']>()
      .mockResolvedValueOnce({
        id: '1',
        email: 'a@a.ru',
        name: 'Anna',
        password: user.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    const res = await userService.validateUser({
      email: 'a@a.ru',
      password: '1',
    });

    expect(res).toEqual({
      id: '1',
      email: 'a@a.ru',
      name: 'Anna',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
