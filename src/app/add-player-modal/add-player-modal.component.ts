import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayersService } from '../players.service';
import { SessionService } from '../session.service';
import { combineLatest, of, Subscribable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from '../player';

@Component({
  selector: 'app-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  styleUrls: ['./add-player-modal.component.css']
})
export class AddPlayerModalComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  private sub: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private playersService: PlayersService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sub = combineLatest(
      this.playersService.players,
      this.sessionService.currentSession
    ).subscribe(val => {
      this.players = val[0].filter(
        p => !val[1].players.some(sp => sp.player.id === p.id)
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addPlayer(p: Player) {
    this.sessionService.addPlayer(p);
  }

  close() {
    this.activeModal.dismiss();
  }
}
