import { Player } from './player';

export class SessionPlayer {
  player: Player;
  arrived: string;
  played: number;
  lastPlayed?: Date;
  playing: boolean;
}
