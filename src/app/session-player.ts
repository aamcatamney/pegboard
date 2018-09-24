import { Player } from './player';

export class SessionPlayer {
  player: Player;
  arrived: string;
  played: number;
  won: number;
  lastPlayed: string;
  lastWon: string;
  playing: boolean;
  partners: string[];
  against: string[];
}
