import type { NoteModel } from '../../../generated/prisma/client.js';
import type { Note } from '../entity/note.entity.js';

export interface INoteRepository {
  createNote: (note: Note) => Promise<NoteModel | null>;
  getNoteById: (noteId: string, userId: string) => Promise<NoteModel | null>;
  getAllNotes: (userId: string) => Promise<NoteModel[] | null>;
}
