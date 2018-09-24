import { Pipe, PipeTransform } from '@angular/core';
import { SessionPlayer } from './session-player';
import { orderBy } from 'lodash';

@Pipe({
  name: 'playing',
  pure: false
})
export class PlayingPipe implements PipeTransform {
  transform(items: SessionPlayer[]): any {
    return orderBy(
      items.filter(p => p.playing === false),
      ['lastPlayed', 'lastWon'],
      ['asc', 'desc']
    );
  }
}
