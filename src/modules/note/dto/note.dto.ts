import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class NoteDto {
  @IsString({ message: 'Не указан контент заметки' })
  content: string;

  @IsString({ message: 'Не указан заголовок заметки' })
  title: string;

  @IsArray({ message: 'Не указаны теги заметки' })
  @ArrayMinSize(1, { message: 'Должен быть хотя бы один тег' })
  @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
  tags: string[];
}
