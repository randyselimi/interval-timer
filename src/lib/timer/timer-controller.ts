import { TimerGrid } from './timer-grid';
import type { ITimer, TimerProps, TimerState } from './timer';

export interface TimerData {
  state: TimerState;
  props: TimerProps;
}

export class TimerController {
  grid: TimerGrid;
  running = false;

  constructor(timers?: ITimer[]) {
    this.grid = new TimerGrid(timers);
  }
  start() {
    if (this.running) {
      return;
    }
    for (const row of this.grid.getRows()) {
      row.start();
    }
    this.running = true;
  }
  stop() {
    for (const row of this.grid.getRows()) {
      row.stop();
    }
    this.running = false;
  }
  reset() {
    for (const row of this.grid.getRows()) {
      row.reset();
    }
    this.running = false;
  }
  add(...timers: ITimer[]) {
    for (const timer of timers) {
      this.grid.add(timer);
    }
  }
}
