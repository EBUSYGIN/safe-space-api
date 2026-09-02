import type { UserModel } from '../../generated/prisma/client.js';
import type { UserLoginDto, UserRegisterDto } from './dto/user.dto.js';

type UserWithoutPassword = Omit<UserModel, 'password'>;

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<UserWithoutPassword | null>;
  validateUser: (dto: UserLoginDto) => Promise<UserWithoutPassword | null>;
  signToken: (email: string, secret: string) => Promise<string>;
  getUserInfo: (email: string) => Promise<UserWithoutPassword | null>;
}
