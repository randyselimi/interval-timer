export abstract class Tile {
  x = 0;
  y = 0;
  name = '';
  sound = '';
  type = '';
  finished = false;
  constructor(x: number, y: number, name: string, sound: string, type: string) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.sound = sound;
    this.type = type;
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
}
