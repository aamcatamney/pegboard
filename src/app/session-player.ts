import { Player } from './player';

export class SessionPlayer {
  player: Player;
  arrived: string;
  played: number;
  lastPlayed?: string;
  playing: boolean;
}
