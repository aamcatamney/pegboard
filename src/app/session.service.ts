import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/session';
import { Player } from './player';
import { SessionPlayer } from './session-player';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
}
