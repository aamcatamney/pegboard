import { Component, OnInit, Input } from '@angular/core';
import { Court } from '../court';
import { SessionService } from '../session.service';
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameFinishedModalComponent } from '../game-finished-modal/game-finished-modal.component';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
  @Input()
  court: Court;

  @Input()
  showDelete = false;

  faTrash = faTrash;
  faCheck = faCheck;

  constructor(
    private sessionService: SessionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  finishGame() {
    const mi = this.modalService.open(GameFinishedModalComponent);
    mi.componentInstance.court = this.court;
    mi.result.then(() => {}, () => {});
  }

  removeCourt() {
    this.sessionService.removeCourt(this.court);
  }
}
