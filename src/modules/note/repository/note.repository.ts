import { inject, injectable } from 'inversify';
import type { DatabaseService } from '../../../common/database/database.service.js';
import { DITypes } from '../../../DI.types.js';
import type { NoteModel } from '../../../generated/prisma/client.js';
import type { Note } from '../entity/note.entity.js';
import type { INoteRepository } from './note.repository.types.js';

@injectable()
export class NoteRepository implements INoteRepository {
  constructor(@inject(DITypes.IDatabaseService) private databaseService: DatabaseService) {}

  createNote(note: Note) {
    const newNote = this.databaseService.client.noteModel.create({
      data: {
        content: note.content,
        title: note.title,
        userId: note.userId,
      },
    });
    return newNote;
  }
  getNoteById: (id: number) => Promise<NoteModel | null>;
  getAllNotes: () => Promise<NoteModel[]>;
}
