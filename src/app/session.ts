import { SessionPlayer } from './session-player';
import { Player } from './player';

export class Session {
  started: string;
  players: SessionPlayer[] = [];

  constructor() {
    this.started = new Date().toISOString();
  }
}
