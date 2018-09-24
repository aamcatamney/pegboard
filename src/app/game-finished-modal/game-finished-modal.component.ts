import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../session.service';
import { Court } from '../court';

@Component({
  selector: 'app-game-finished-modal',
  templateUrl: './game-finished-modal.component.html',
  styleUrls: ['./game-finished-modal.component.css']
})
export class GameFinishedModalComponent implements OnInit {
  public court: Court;

  constructor(
    private activeModal: NgbActiveModal,
    private sessionService: SessionService
  ) {}

  ngOnInit() {}

  finishGame(homeWon: boolean) {
    this.court.game.wonByHome = homeWon;
    this.sessionService.finishGame(this.court);
    this.activeModal.close();
  }

  close() {
    this.activeModal.dismiss();
  }
}
