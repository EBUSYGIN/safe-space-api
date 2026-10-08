import { ArrayMinSize, IsArray, IsDateString, IsString } from 'class-validator';

export class NoteDto {
  @IsString({ message: 'Не указан контент заметки' })
  content: string;

  @IsString({ message: 'Не указан заголовок заметки' })
  title: string;

  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: 'Указана некорректная дата заметки' },
  )
  date: string;

  @IsArray({ message: 'Не указаны теги заметки' })
  @ArrayMinSize(1, { message: 'Должен быть хотя бы один тег' })
  @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
  tags: string[];
}
