import type { Tile } from './tile';

export class TileRow {
  private tiles: Tile[] = [];

  start(): void {
    const tile = this.getReadyTile();
    tile ? tile.start() : this.restart();
  }
  stop(): void {
    for (const tile of this.tiles) {
      tile.stop();
    }
  }
  reset(): void {
    for (const tile of this.tiles) {
      tile.reset();
    }
  }
  restart(): void {
    this.stop();
    this.reset();
    this.start();
  }
  getTile(x: number): Tile | null {
    return this.tiles[x] ? this.tiles[x] : null;
  }
  getTiles(): Tile[] {
    return this.tiles;
  }
  addTile(tile: Tile) {
    if (this.tiles[tile.x]) {
      console.log('invalid');
    }
    this.tiles[tile.x] = tile;
    tile.onFinish.push(() => this.start());
  }

  //Get the first, non-finished tile in the row
  private getReadyTile(): Tile | null {
    for (const tile of this.tiles) {
      if (!tile.finished) {
        return tile;
      }
    }
    return null;
  }
}
