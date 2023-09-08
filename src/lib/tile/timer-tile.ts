import type { Timer } from '$lib/timer/timer';
import { Tile } from './tile';

export class TimerTile extends Tile {
  timer: Timer;
  constructor(timer: Timer, x: number, y: number, name: string, sound: string) {
    super(x, y, name, sound, 'timer');
    this.timer = timer;
    this.timer.onFinish.push(() => {
      this.finish();
    });
  }
  start() {
    this.timer.start();
  }
  stop() {
    this.timer.stop();
  }
  reset() {
    this.timer.reset();
    this.finished = false;
  }
}
