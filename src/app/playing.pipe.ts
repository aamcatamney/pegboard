import { Pipe, PipeTransform } from '@angular/core';
import { SessionPlayer } from './session-player';

@Pipe({
  name: 'playing',
  pure: false
})
export class PlayingPipe implements PipeTransform {
  transform(items: SessionPlayer[]): any {
    return items.filter(p => p.playing === false);
  }
}
