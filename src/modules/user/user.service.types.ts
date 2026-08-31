import type { UserModel } from '../../generated/prisma/client.js';
import type { UserLoginDto, UserRegisterDto } from './dto/user.dto.js';

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<Omit<UserModel, 'password'> | null>;
  validateUser: (dto: UserLoginDto) => Promise<Omit<UserModel, 'password'> | null>;
}
