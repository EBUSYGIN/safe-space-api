import { IsString } from 'class-validator';

export class NoteDto {
  @IsString({ message: 'Не указан контент заметки' })
  content: string;

  @IsString({ message: 'Не указан заголовок заметки' })
  title: string;
}
