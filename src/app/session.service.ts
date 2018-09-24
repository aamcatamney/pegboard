import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/session';
import { Player } from './player';
import { SessionPlayer } from './session-player';
import { Court } from './court';
import { Game } from './game';
import { PlayingPipe } from './playing.pipe';
import { PickPlayer } from './pick-player';
import { random } from 'lodash';
import { PlayersService } from './players.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _currentSession: Session = null;
  currentSession = new BehaviorSubject<Session>(null);
  haveSession = false;

  constructor(private playerService: PlayersService) {
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
    this._currentSession.players.forEach(sp =>
      this.removePlayer(sp.player.id, false)
    );
    this.playerService.setAndCheck();
    this._currentSession = null;
    this.setAndCheck();
  }

  addPlayer(player: Player) {
    const sp = new SessionPlayer();
    sp.player = player;
    sp.arrived = new Date().toISOString();
    sp.lastPlayed = new Date().toISOString();
    sp.lastWon = new Date().toISOString();
    sp.played = 0;
    sp.won = 0;
    sp.playing = false;
    sp.partners = [];
    sp.against = [];
    this._currentSession.players.push(sp);
    this.setAndCheck();
  }

  removePlayer(id: string, fromArray: boolean) {
    const sp = this._currentSession.players.find(p => p.player.id === id);
    sp.player.totalSessions = sp.player.totalSessions + 1;
    sp.player.totalWon = sp.player.totalWon + sp.won;
    sp.player.totalPlayed = sp.player.totalPlayed + sp.played;
    if (fromArray) {
      this._currentSession.players.splice(
        this._currentSession.players.indexOf(sp),
        1
      );
      this.setAndCheck();
    }
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
    game.started = new Date().toISOString();
    this._currentSession.courts.filter(c => !c.game)[0].game = game;
    this.setAndCheck();
  }

  private processTeam(
    team: SessionPlayer[],
    won: boolean,
    other: SessionPlayer[]
  ) {
    team.forEach(p => {
      const player = this._currentSession.players.find(
        pp => pp.player.id === p.player.id
      );
      if (team.length > 1) {
        player.partners.push(
          ...team
            .filter(f => f.player.id !== player.player.id)
            .map(m => m.player.id)
        );
      }
      player.against.push(...other.map(m => m.player.id));
      player.lastPlayed = new Date().toISOString();
      player.played++;
      player.playing = false;
      if (won) {
        player.lastWon = new Date().toISOString();
        player.won++;
      }
    });
  }

  finishGame(court: Court) {
    this.processTeam(
      court.game.homeTeam,
      court.game.wonByHome,
      court.game.awayTeam
    );
    this.processTeam(
      court.game.awayTeam,
      !court.game.wonByHome,
      court.game.homeTeam
    );
    court.game = null;
    this.setAndCheck();
  }

  private pickPlayer(
    players: SessionPlayer[],
    mainPlayer: SessionPlayer,
    partner: boolean
  ): SessionPlayer {
    const picks: PickPlayer[] = [];
    let currentScore = 0;
    players.forEach((p, i) => {
      const pick = new PickPlayer();
      pick.sp = p;
      pick.scoreFrom = currentScore;
      pick.scoreTo = currentScore;
      // Position
      pick.scoreTo += players.length - i;
      const levelDiff = mainPlayer.player.level - p.player.level;
      // Partnered?
      if (partner && !mainPlayer.partners.some(s => p.player.id === s)) {
        pick.scoreTo += Math.ceil(players.length / 2);
      }
      // Played?
      if (!mainPlayer.against.some(s => p.player.id === s)) {
        pick.scoreTo += Math.ceil(players.length / 2);
      }
      // Level?
      if (levelDiff === 0) {
        pick.scoreTo += 4;
      } else if (levelDiff === 1 || levelDiff === -1) {
        pick.scoreTo += 3;
      } else if (levelDiff === 2 || levelDiff === -2) {
        pick.scoreTo += 2;
      }

      picks.push(pick);
      currentScore = pick.scoreTo + 1;
    });
    let selected: PickPlayer = null;
    while (selected === null || selected === undefined) {
      const score = random(0, currentScore - 1, true);
      selected = picks.filter(
        p => score >= p.scoreFrom && score <= p.scoreTo
      )[0];
    }
    selected.sp.playing = true;
    return selected.sp;
  }

  pickGame() {
    const players = <SessionPlayer[]>(
      new PlayingPipe().transform(this._currentSession.players)
    );
    if (players.length > 1) {
      const mainPlayer = players.splice(0, 1)[0];
      if (players.length > 1) {
        mainPlayer.playing = true;
        const partner = this.pickPlayer(players, mainPlayer, true);
        players.splice(players.indexOf(partner), 1);
        const awayOne = this.pickPlayer(players, mainPlayer, false);
        players.splice(players.indexOf(awayOne), 1);
        const awayTwo = this.pickPlayer(players, mainPlayer, false);
        const game = new Game();
        game.homeTeam = [mainPlayer, partner];
        game.awayTeam = [awayOne, awayTwo];
        this.startGame(game);
      }
    }
  }
}
