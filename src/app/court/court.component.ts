import { Component, OnInit, Input } from '@angular/core';
import { Court } from '../court';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-court',
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.css']
})
export class CourtComponent implements OnInit {
  @Input()
  court: Court;

  constructor(private sessionService: SessionService) {}

  ngOnInit() {}

  finishGame() {
    this.sessionService.finishGame(this.court);
  }
}
