import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Session } from 'src/app/session';
import { AddPlayerModalComponent } from '../add-player-modal/add-player-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { range } from 'lodash';
import { SessionPlayer } from '../session-player';
import { Game } from '../game';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  session: Session;
  stagingHome: SessionPlayer[] = [];
  stagingAway: SessionPlayer[] = [];

  constructor(
    public sessionService: SessionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.sessionService.currentSession.subscribe(cs => (this.session = cs));
    console.log(this.session);
  }

  addCourt() {
    this.sessionService.addCourt();
  }

  addPlayers() {
    const mi = this.modalService.open(AddPlayerModalComponent);
    mi.result.then(() => {}, () => {});
  }

  startGame() {}

  addPlayerToStaging(player: SessionPlayer) {
    if (this.stagingHome.length <= 1) {
      player.playing = true;
      this.stagingHome.push(player);
    } else if (this.stagingAway.length <= 1) {
      player.playing = true;
      this.stagingAway.push(player);
    }
  }

  cancelStaging() {
    this.stagingHome.forEach(p => (p.playing = false));
    this.stagingAway.forEach(p => (p.playing = false));
    this.stagingHome = [];
    this.stagingAway = [];
  }

  stagingHomePlayerClick(player: SessionPlayer) {
    this.stagingHome.splice(this.stagingHome.indexOf(player), 1);
    if (this.stagingAway.length < 2) {
      this.stagingAway.push(player);
    } else {
      player.playing = false;
    }
  }

  stagingAwayPlayerClick(player: SessionPlayer) {
    this.stagingAway.splice(this.stagingAway.indexOf(player), 1);
    if (this.stagingHome.length < 2) {
      this.stagingHome.push(player);
    } else {
      player.playing = false;
    }
  }

  startStaging() {
    const g = new Game();
    g.homeTeam = this.stagingHome.splice(0, this.stagingHome.length);
    g.awayTeam = this.stagingAway.splice(0, this.stagingAway.length);
    g.started = new Date().toISOString();
    this.sessionService.startGame(g);
  }

  finished() {
    if (confirm('Close Session?')) {
      this.sessionService.finishSession();
    }
  }
}
