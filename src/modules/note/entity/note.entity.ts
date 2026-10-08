export class Note {
  content: string;
  title: string;
  date: Date;
  userId: string;

  constructor(content: string, title: string, date: Date, userId: string) {
    this.content = content;
    this.title = title;
    this.date = date;
    this.userId = userId;
  }
}
