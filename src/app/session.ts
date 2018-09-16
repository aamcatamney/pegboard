import { SessionPlayer } from './session-player';
import { Player } from './player';
import { Court } from './court';

export class Session {
  started: string;
  players: SessionPlayer[] = [];
  courts: Court[] = [];

  constructor() {
    this.started = new Date().toISOString();
  }
}
