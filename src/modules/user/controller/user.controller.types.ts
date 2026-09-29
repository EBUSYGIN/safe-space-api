import type { NextFunction, Request, Response, Router } from 'express';

export interface IUserController {
  router: Router;
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
  getUserInfo: (req: Request, res: Response, next: NextFunction) => void;
}
