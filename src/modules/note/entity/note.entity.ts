export class Note {
  content: string;
  title: string;
  userId: string;

  constructor(content: string, title: string, userId: string) {
    this.content = content;
    this.title = title;
    this.userId = userId;
  }
}
