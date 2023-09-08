import { tiles } from './tile-data.ts';

const db: object[] = tiles;

export function getTiles() {
  return db;
}

export function createTile(x: number, y: number, name: string, sound: string, duration: number) {
  db.push({ x, y, name, sound, duration });
}
