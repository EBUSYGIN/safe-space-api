import type { NextFunction, Request, Response } from 'express';

export interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  getUserInfo: (req: Request, res: Response, next: NextFunction) => void;
}
