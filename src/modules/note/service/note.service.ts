import { inject, injectable } from 'inversify';
import type { ILog } from '../../../common/logger/logger.types.js';
import { DITypes } from '../../../DI.types.js';
import type { NoteDto } from '../dto/note.dto.js';
import { Note } from '../entity/note.entity.js';
import type { INoteRepository } from '../repository/note.repository.types.js';
import type { INoteService } from './note.service.types.js';

@injectable()
export class NoteService implements INoteService {
  constructor(
    @inject(DITypes.ILog) private logger: ILog,
    @inject(DITypes.INoteRepository) private noteRepository: INoteRepository,
  ) {}

  async createNote(noteDto: NoteDto, userId: string) {
    const newNote = new Note(noteDto.content, noteDto.title, userId);
    const savedNote = await this.noteRepository.createNote(newNote);
    if (!savedNote) {
      this.logger.error('[Note Service]: error in creating note');
      return null;
    }
    return savedNote;
  }

  async getAllNotes(userId: string) {
    const notes = await this.noteRepository.getAllNotes(userId);
    if (!notes) {
      this.logger.error('[Note Service]: error in fetching notes');
      return null;
    }
    return notes;
  }

  async getNoteById(noteId: string, userId: string) {
    const note = await this.noteRepository.getNoteById(noteId, userId);
    if (!note) {
      this.logger.error('[Note Service]: error in fetching note');
      return null;
    }
    return note;
  }
}
