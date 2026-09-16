import type { SignOptions } from 'jsonwebtoken';

export interface IAuthService {
  createAccessToken: (
    payload: Record<string, unknown>,
    options?: SignOptions,
  ) => Promise<string | null>;
  createRefreshToken: (
    payload: Record<string, unknown>,
    options?: SignOptions,
  ) => Promise<string | null>;
}
