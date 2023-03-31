export interface TimerState {
  duration: number;
  elapsed: number;
  running: boolean;
  finished: boolean;
}

export interface TimerProps {
  name: string;
  sound: string;
  x: number;
  y: number;
}

export interface ITimer {
  state: TimerState;
  props: TimerProps;
  start(): void;
  stop(): void;
  toggle(): void;
  reset(): void;
  restart(): void;
  onfinish: (() => void)[];
}
export class WorkerTimer implements ITimer {
  state: TimerState;
  props: TimerProps;
  private worker: Worker | undefined = undefined;

  constructor(
    { duration = 0, elapsed = 0, running = false, finished = false }: TimerState,
    { name = '', sound = '', x = 0, y = 0 }: TimerProps,
    worker: Worker
  ) {
    this.state = { duration: duration, elapsed: elapsed, running: running, finished: finished };
    this.props = { name: name, sound: sound, x: x, y: y };
    this.worker = worker;
    this.worker.onmessage = () => this.handleTick();
  }
  start() {
    if (this.state.running || this.state.finished) {
      return;
    }
    this.state.running = true;
    this.worker?.postMessage({ message: 'start' });
  }
  stop() {
    if (this.state.finished) {
      return;
    }
    this.state.running = false;
    this.worker?.postMessage({ message: 'stop' });
  }
  toggle() {
    this.state.running ? this.stop() : this.start();
  }
  reset() {
    this.stop();
    this.state.finished = false;
    this.state.elapsed = 0;
  }
  restart() {
    this.reset();
    this.start();
  }
  onfinish: (() => void)[] = [];
  private handleTick() {
    this.state.elapsed += 100;
    //finish logic
    if (this.state.elapsed >= this.state.duration) {
      this.stop();
      this.state.finished = true;
      this.onfinish.forEach((callback) => callback());
    }
  }
}

export class NodeTimer implements ITimer {
  state: TimerState;
  props: TimerProps;
  private timer: NodeJS.Timer | undefined = undefined;

  constructor(
    { duration = 0, elapsed = 0, running = false, finished = false }: TimerState,
    { name = '', sound = '', x = 0, y = 0 }: TimerProps
  ) {
    this.state = { duration: duration, elapsed: elapsed, running: running, finished: finished };
    this.props = { name: name, sound: sound, x: x, y: y };
  }
  start() {
    if (this.state.running || this.state.finished) {
      return;
    }
    this.state.running = true;
    this.timer = setInterval(() => this.handleTick(), 100);
  }
  stop() {
    if (!this.timer || this.state.finished) {
      return;
    }
    this.state.running = false;
    clearInterval(this.timer);
    this.timer = undefined;
  }
  toggle() {
    this.state.running ? this.stop() : this.start();
  }
  reset() {
    this.stop();
    this.state.finished = false;
    this.state.elapsed = 0;
  }
  restart() {
    this.reset();
    this.start();
  }
  onfinish: (() => void)[] = [];
  private handleTick() {
    this.state.elapsed += 100;
    //finish logic
    if (this.state.elapsed >= this.state.duration) {
      this.stop();
      this.state.finished = true;
      this.onfinish.forEach((callback) => callback());
    }
  }
}
