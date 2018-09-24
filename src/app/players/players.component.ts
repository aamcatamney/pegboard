import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/players.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerModalComponent } from '../player-modal/player-modal.component';
import { Player } from '../player';
import { random, cloneDeep } from 'lodash';
import {
  faMars,
  faVenus,
  faTrash,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  faMars = faMars;
  faVenus = faVenus;
  faTrash = faTrash;
  faPen = faPen;
  showTestData = false;

  constructor(
    public playersService: PlayersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.showTestData = !environment.production;
  }

  addPlayer() {
    const mi = this.modalService.open(PlayerModalComponent);
    mi.componentInstance.player.gender = 1;
    mi.componentInstance.player.level = 3;
    mi.result.then(() => {}, () => {});
  }

  editPlayer(p: Player) {
    const mi = this.modalService.open(PlayerModalComponent);
    mi.componentInstance.editMode = true;
    mi.componentInstance.player = cloneDeep(p);
    mi.result.then(() => {}, () => {});
  }

  testData() {
    for (let i = 1; i < 26; i++) {
      const player = new Player();
      player.name = `Player ${this.playersService.players.getValue().length +
        1}`;
      player.level = random(1, 5, false);
      player.gender = random(1, 2, false);
      player.totalPlayed = 0;
      player.totalSessions = 0;
      player.totalWon = 0;
      this.playersService.addPlayer(player);
    }
  }

  deletePlayer(player: Player) {
    if (window.confirm('Delete player?')) {
      this.playersService.deletePlayer(player);
    }
  }
}
