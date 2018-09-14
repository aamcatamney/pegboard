export class Player {
  id: number;
  name: string;
  gender: number;
  level: number;

  constructor() {
    this.id = new Date().getUTCSeconds();
  }
}
