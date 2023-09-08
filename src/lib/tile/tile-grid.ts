import { TileRow } from '$lib/tile/tile-row';
import type { Tile } from '$lib/tile/tile';

export class TileGrid {
  private rows: TileRow[] = [];

  constructor(tiles: Tile[] = []) {
    for (const tile of tiles) {
      this.addTile(tile);
    }
  }

  getRow(y: number): TileRow | null {
    return this.rows[y] ? this.rows[y] : null;
  }
  getRows(): TileRow[] {
    return this.rows;
  }
  getTile(x: number, y: number): Tile | null {
    const row = this.getRow(y);
    return row && row.getTile(x);
  }
  getTiles(): Tile[] {
    let tiles: Tile[] = [];
    for (const row of this.getRows()) {
      tiles = tiles.concat(tiles, row.getTiles());
    }
    return tiles;
  }
  addTile(...tiles: Tile[]) {
    for (const tile of tiles) {
      const row = this.getRow(tile.y);
      row ? row.addTile(tile) : this.createRow(tile);
    }
  }

  private createRow(tile: Tile) {
    const row = new TileRow();
    row.addTile(tile);
    this.rows[tile.y] = row;
  }
}
