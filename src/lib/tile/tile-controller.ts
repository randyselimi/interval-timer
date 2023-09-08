import { TileGrid } from './tile-grid';
import type { TileRow } from './tile-row';
import type { Tile } from './tile';

export class TileController {
  private grid: TileGrid;
  public running = false;

  constructor(tiles: Tile[] = []) {
    this.grid = new TileGrid(tiles);
  }

  start(): void {
    if (this.running) {
      return;
    }
    for (const row of this.grid.getRows()) {
      row.start();
    }
    this.running = true;
  }
  stop(): void {
    for (const row of this.grid.getRows()) {
      row.stop();
    }
    this.running = false;
  }
  reset(): void {
    for (const row of this.grid.getRows()) {
      row.reset();
    }
    this.running = false;
  }
  restart(): void {
    for (const row of this.grid.getRows()) {
      row.stop();
      row.reset();
      row.start();
    }
    this.running = true;
  }

  getRow(y: number): TileRow | null {
    return this.grid.getRow(y);
  }
  getRows(): TileRow[] {
    return this.grid.getRows();
  }
  getTile(x: number, y: number): Tile | null {
    return this.grid.getTile(x, y);
  }
  getTiles(): Tile[] {
    return this.grid.getTiles();
  }
  addTile(tile: Tile): void {
    this.grid.addTile(tile);
  }
}
