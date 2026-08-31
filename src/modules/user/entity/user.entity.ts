import { compare, hash } from 'bcryptjs';

export class User {
  private _password: string;

  constructor(
    private readonly _email: string,
    private readonly _name: string,
  ) {}

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(password: string, salt: number) {
    this._password = await hash(password, salt);
  }

  async comparePassword(password: string, hash: string) {
    const result = await compare(password, hash);
    return result;
  }
}
