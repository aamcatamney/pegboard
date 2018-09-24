import { SessionPlayer } from './session-player';

export class Game {
  type: number;
  started: string;
  homeTeam: SessionPlayer[];
  awayTeam: SessionPlayer[];
  wonByHome: boolean;
}
