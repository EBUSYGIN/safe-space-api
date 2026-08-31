import type { UserModel } from '../../generated/prisma/client.js';
import type { User } from './entity/user.entity.js';

export interface IUserRepository {
  createUser: (user: User) => Promise<Omit<UserModel, 'password'> | null>;
  findUserByEmail: (email: string) => Promise<Omit<UserModel, 'password'> | null>;
  findUserByEmailForAuth: (email: string) => Promise<UserModel | null>;
}
