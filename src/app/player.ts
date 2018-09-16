export class Player {
  id: number;
  name: string;
  gender: number;
  level: number;

  constructor() {
    this.id = new Date().getTime() * 10000 + 621355968000000000;
  }
}
