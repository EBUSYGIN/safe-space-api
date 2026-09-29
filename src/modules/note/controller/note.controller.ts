import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import type { IAuthService } from '../../../common/auth/auth.service.types.js';
import { BaseController } from '../../../common/base-controller/base.controller.js';
import type { IConfigService } from '../../../common/config/config.service.types.js';
import type { ILog } from '../../../common/logger/logger.types.js';
import { AuthMiddleware } from '../../../common/middleware/auth.middleware.js';
import { ValidateMiddleware } from '../../../common/middleware/validate.middleware.js';
import { DITypes } from '../../../DI.types.js';
import { NoteDto } from '../dto/note.dto.js';
import type { INoteService } from '../service/note.service.types.js';

@injectable()
export class NoteController extends BaseController {
  constructor(
    @inject(DITypes.ILog) logger: ILog,
    @inject(DITypes.IConfigService) configService: IConfigService,
    @inject(DITypes.IAuthService) authService: IAuthService,
    @inject(DITypes.INoteService) private noteService: INoteService, // Replace 'any' with the actual type of your note service
  ) {
    super(logger);
    const authMiddleware = new AuthMiddleware(configService, authService, 'access');
    this.router.use(authMiddleware.execute.bind(authMiddleware));
    this.bindRoutes([
      {
        method: 'post',
        path: '/create',
        function: this.createNote,
        middlewares: [new ValidateMiddleware(NoteDto)],
      },
      {
        method: 'get',
        path: '/all',
        function: this.getAllNotes,
        middlewares: [],
      },
      {
        method: 'get',
        path: '/one/:noteId',
        function: this.getNoteById,
        middlewares: [],
      },
    ]);
  }

  async createNote(req: Request<{}, {}, NoteDto>, res: Response, _next: NextFunction) {
    if (!req.userId || !req.body) {
      return this.sendError(res, 400, { error: 'Error fetching notes' });
    }
    const savedNote = await this.noteService.createNote(req.body, req.userId);
    return this.sendSuccess(res, 200, { message: 'Note created successfully', note: savedNote });
  }

  async getAllNotes(req: Request, res: Response, _next: NextFunction) {
    if (!req.userId) {
      return this.sendError(res, 400, { error: 'Error fetching notes' });
    }
    const notes = await this.noteService.getAllNotes(req.userId);
    return this.sendSuccess(res, 200, { message: 'Notes fetched successfully', notes });
  }

  async getNoteById(req: Request, res: Response, _next: NextFunction) {
    //Check types later
    const noteId = req.params.noteId;
    if (!req.userId || !noteId) {
      return this.sendError(res, 400, { message: 'Invalid request data' });
    }
    const note = await this.noteService.getNoteById(noteId as string, req.userId);
    if (!note) {
      return this.sendError(res, 404, { error: 'Error fetching note' });
    }
    return this.sendSuccess(res, 200, { message: 'Note fetched successfully', note });
  }
}
