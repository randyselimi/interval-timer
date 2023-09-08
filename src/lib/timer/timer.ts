export abstract class Timer {
  duration: number;
  elapsed: number;
  running: boolean;
  finished: boolean;

  constructor(duration: number, elapsed = 0, running = false, finished = false) {
    this.duration = duration;
    this.elapsed = elapsed;
    this.running = running;
    this.finished = finished;
  }

  abstract start(): void;
  abstract stop(): void;
  abstract reset(): void;
  restart(): void {
    this.stop();
    this.reset();
    this.start();
  }
  finish() {
    this.stop();
    this.finished = true;
    this.onFinish.forEach((callback) => callback());
  }
  onFinish: (() => void)[] = [];
  protected abstract handleTick(tick: number): void;
}
