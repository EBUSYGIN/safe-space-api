import type { NextFunction, Request, Response, Router } from 'express';

export interface INoteController {
  router: Router;
  createNote: (req: Request, res: Response, next: NextFunction) => void;
}
