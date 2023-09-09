import { Timer } from './timer';

export class WorkerTimer extends Timer {
  private worker: Worker | undefined = undefined;

  constructor(worker: Worker, duration: number, elapsed = 0, running = false, finished = false) {
    super(duration, elapsed, running, finished);
    this.worker = worker;
    this.worker.onmessage = () => this.handleTick();
  }
  start() {
    if (this.running || this.finished) {
      return;
    }
    this.running = true;
    this.worker?.postMessage({ message: 'start' });
  }
  stop() {
    if (this.finished) {
      return;
    }
    this.running = false;
    this.worker?.postMessage({ message: 'stop' });
  }
  reset() {
    this.stop();
    this.finished = false;
    this.elapsed = 0;
  }
  protected handleTick() {
    this.elapsed += 100;
    if (this.elapsed >= this.duration) {
      this.finish();
    }
  }
}
