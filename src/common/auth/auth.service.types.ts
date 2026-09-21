import type { SignOptions } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export interface IAuthService {
  createAccessToken: (
    payload: Record<string, unknown>,
    options?: SignOptions,
  ) => Promise<string | null>;
  createRefreshToken: (
    payload: Record<string, unknown>,
    options?: SignOptions,
  ) => Promise<string | null>;
  verifyToken: (token: string, audience: string, secret: string) => jwt.JwtPayload | null;
}
