import type { NoteModel } from '../../../generated/prisma/client.js';
import type { NoteDto } from '../dto/note.dto.js';

export interface INoteService {
  createNote: (noteDto: NoteDto, userId: string) => Promise<NoteModel | null>;
  getAllNotes: (userId: string) => Promise<NoteModel[] | null>;
  getNoteById: (noteId: string, userId: string) => Promise<NoteModel | null>;
}
