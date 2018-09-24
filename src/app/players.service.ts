import { Injectable } from "@angular/core";
import { Player } from "./player";
import { BehaviorSubject } from "rxjs";
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: "root"
})
export class PlayersService {
  private _players: Player[] = [];
  public players = new BehaviorSubject<Player[]>([]);
  public anyPlayers = false;

  constructor() {
    if (localStorage.getItem("players")) {
      this._players = JSON.parse(localStorage.getItem("players"));
      this.players.next(this._players);
      this.anyPlayers = this._players && this._players.length > 0;
    }
  }

  setAndCheck() {
    this.anyPlayers = this._players.length > 0;
    this.players.next(this._players);
    localStorage.setItem("players", JSON.stringify(this._players));
  }

  addPlayer(player: Player) {
    player.id = Guid.create().toString();
    this._players.push(player);
    this.setAndCheck();
  }

  updatePlayer(index: number, player: Player) {
    this._players.splice(index, 1, player);
    this.setAndCheck();
  }

  deletePlayer(player: Player) {
    this._players.splice(this._players.indexOf(player), 1);
    this.setAndCheck();
  }
}
