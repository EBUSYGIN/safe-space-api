import { inject, injectable } from 'inversify';
import type { DatabaseService } from '../../../common/database/database.service.js';
import { DITypes } from '../../../DI.types.js';
import type { Note } from '../entity/note.entity.js';
import type { INoteRepository } from './note.repository.types.js';

@injectable()
export class NoteRepository implements INoteRepository {
  constructor(@inject(DITypes.IDatabaseService) private databaseService: DatabaseService) {}

  async createNote(note: Note) {
    const newNote = await this.databaseService.client.noteModel.create({
      data: {
        content: note.content,
        title: note.title,
        userId: note.userId,
      },
    });
    return newNote;
  }

  async getAllNotes(userId: string) {
    const notes = await this.databaseService.client.noteModel.findMany({
      where: {
        userId,
      },
    });
    return notes;
  }

  async getNoteById(noteId: string, userId: string) {
    const note = await this.databaseService.client.noteModel.findUnique({
      where: {
        id: noteId,
        userId,
      },
    });
    return note;
  }
}
