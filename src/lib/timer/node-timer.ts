import { Timer } from './timer';

export class NodeTimer extends Timer {
  private timer: NodeJS.Timer | undefined = undefined;

  constructor(duration: number, elapsed = 0, running = false, finished = false) {
    super(duration, elapsed, running, finished);
  }
  start() {
    if (this.running || this.finished) {
      return;
    }
    this.running = true;
    this.timer = setInterval(() => this.handleTick(), 100);
  }
  stop() {
    if (!this.timer || this.finished) {
      return;
    }
    this.running = false;
    clearInterval(this.timer);
    this.timer = undefined;
  }
  toggle() {
    this.running ? this.stop() : this.start();
  }
  reset() {
    this.stop();
    this.finished = false;
    this.elapsed = 0;
  }
  restart() {
    this.reset();
    this.start();
  }
  onFinish: (() => void)[] = [];
  protected handleTick() {
    this.elapsed += 10;
    //finish logic
    if (this.elapsed >= this.duration) {
      this.stop();
      this.finished = true;
      this.onFinish.forEach((callback) => callback());
    }
  }
}
