import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Session } from 'src/app/session';
import { AddPlayerModalComponent } from '../add-player-modal/add-player-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  session: Session;

  constructor(
    public sessionService: SessionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.sessionService.currentSession.subscribe(cs => (this.session = cs));
  }

  addCourt() {}

  addPlayers() {
    const mi = this.modalService.open(AddPlayerModalComponent);
    mi.result.then(() => {}, () => {});
  }

  finished() {
    if (confirm('Close Session?')) {
      this.sessionService.finishSession();
    }
  }
}
