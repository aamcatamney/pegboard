import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input()
  start: string;
  @Input()
  end?: string;
  display = '00:00:00';
  private interSub: Subscription;

  constructor() {}

  ngOnInit() {
    this.workout();
    this.interSub = interval(1000).subscribe(() => this.workout());
  }

  workout() {
    if (this.start) {
      const distance =
        new Date(this.end || new Date().toISOString()).getTime() -
        new Date(this.start).getTime();

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.display = `${hours
        .toString()
        .padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  ngOnDestroy() {
    if (this.interSub && !this.interSub.closed) {
      this.interSub.unsubscribe();
    }
  }
}
