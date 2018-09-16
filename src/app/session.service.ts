import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/session';
import { Player } from './player';
import { SessionPlayer } from './session-player';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Court } from './court';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _currentSession: Session = null;
  currentSession = new BehaviorSubject<Session>(null);
  haveSession = false;

  constructor() {
    if (localStorage.getItem('currentSession')) {
      this._currentSession = JSON.parse(localStorage.getItem('currentSession'));
      this.currentSession.next(this._currentSession);
      this.haveSession = true;
    }
  }

  private setAndCheck() {
    this.haveSession = this._currentSession !== null;
    this.currentSession.next(this._currentSession);
    if (this.haveSession) {
      localStorage.setItem(
        'currentSession',
        JSON.stringify(this._currentSession)
      );
    } else {
      localStorage.removeItem('currentSession');
    }
  }

  startSession() {
    this._currentSession = new Session();
    this.setAndCheck();
  }

  finishSession() {
    this._currentSession = null;
    this.setAndCheck();
  }

  addPlayer(player: Player) {
    const sp = new SessionPlayer();
    sp.player = player;
    sp.arrived = new Date().toISOString();
    sp.played = 0;
    sp.playing = false;
    this._currentSession.players.push(sp);
    this.setAndCheck();
  }

  addCourt() {
    this._currentSession.courts.push({
      number: this._currentSession.courts.length + 1
    });
    this.setAndCheck();
  }

  removeCourt(court: Court) {
    this._currentSession.courts.splice(
      this._currentSession.courts.indexOf(court),
      1
    );
    this.setAndCheck();
  }

  startGame(game: Game) {
    this._currentSession.courts.filter(c => !c.game)[0].game = game;
    this.setAndCheck();
  }

  finishGame(court: Court) {
    court.game.finished = new Date().toUTCString();
    court.game.homeTeam.forEach(p => {
      const player = this._currentSession.players.find(
        pp => pp.player.id === p.player.id
      );
      player.lastPlayed = new Date().toISOString();
      player.played++;
      player.playing = false;
    });
    court.game.awayTeam.forEach(p => {
      const player = this._currentSession.players.find(
        pp => pp.player.id === p.player.id
      );
      player.lastPlayed = new Date().toISOString();
      player.played++;
      player.playing = false;
    });
    court.game = null;
    this.setAndCheck();
  }
}
