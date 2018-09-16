import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { PlayerModalComponent } from './player-modal/player-modal.component';
import { SessionComponent } from './session/session.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimerComponent } from './timer/timer.component';
import { AddPlayerModalComponent } from './add-player-modal/add-player-modal.component';
import { CourtComponent } from './court/court.component';
import { PlayingPipe } from './playing.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerModalComponent,
    SessionComponent,
    TimerComponent,
    AddPlayerModalComponent,
    CourtComponent,
    PlayingPipe
  ],
  entryComponents: [PlayerModalComponent, AddPlayerModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
