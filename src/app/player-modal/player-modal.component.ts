import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../player';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.css']
})
export class PlayerModalComponent implements OnInit, AfterViewInit {
  @ViewChild('name')
  name: ElementRef;
  player: Player = new Player();
  editMode = false;
  genders = [{ label: 'Male', value: 1 }, { label: 'Female', value: 2 }];
  levels = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];

  constructor(
    private activeModal: NgbActiveModal,
    private playersService: PlayersService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.name.nativeElement.focus(), 250);
  }

  close() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (this.editMode) {
      const index = this.playersService.players
        .getValue()
        .findIndex(p => p.id === this.player.id);
      this.playersService.updatePlayer(index, this.player);
    } else {
      this.playersService.addPlayer(this.player);
    }
    this.activeModal.close();
  }
}
