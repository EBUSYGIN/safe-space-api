import { inject, injectable } from 'inversify';
import { DITypes } from '../../DI.types.js';
import type { IConfigService } from '../../common/config/config.service.types.js';
import type { UserLoginDto, UserRegisterDto } from './dto/user.dto.js';
import { User } from './entity/user.entity.js';
import type { IUserRepository } from './user.repository.types.js';
import type { IUserService } from './user.service.types.js';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(DITypes.IConfigService) private configService: IConfigService,
    @inject(DITypes.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async createUser({ email, name, password }: UserRegisterDto) {
    const newUser = new User(email, name);
    const salt = this.configService.get('salt');
    await newUser.setPassword(password, Number(salt));
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      return null;
    }

    const createdUser = await this.userRepository.createUser(newUser);
    return createdUser;
  }

  async validateUser({ email, password }: UserLoginDto) {
    const existingUser = await this.userRepository.findUserByEmailForAuth(email);
    if (!existingUser) return null;

    const user = new User(existingUser.email, existingUser.name);
    const result = await user.comparePassword(password, existingUser.password);
    if (!result) return null;

    const { password: _password, ...cleanUser } = existingUser;
    return cleanUser;
  }
}
