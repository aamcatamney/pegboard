import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
  { path: 'players', component: PlayersComponent },
  { path: 'session', component: SessionComponent },
  { path: '**', redirectTo: 'players' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
