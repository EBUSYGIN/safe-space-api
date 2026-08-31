import { IsEmail, IsString } from 'class-validator';

class UserBaseDto {
  @IsEmail({}, { message: 'Неправильный формат почты' })
  email: string;

  @IsString({ message: 'Не указан пароль' })
  password: string;
}

export class UserLoginDto extends UserBaseDto {}

export class UserRegisterDto extends UserBaseDto {
  @IsString({ message: 'Не указано имя пользователя' })
  name: string;
}
