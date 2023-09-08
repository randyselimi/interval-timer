<script lang="ts">
  import type { TileRow } from '$lib/tile/tile-row';
  import Tile from './tile.svelte';
  import CreateTile from './create-tile.svelte';
  import TimerTile from './timer-tile.svelte';
  export let row: TileRow;
  console.log(row);
</script>

<div class="row">
  {#each row.getTiles() as tile}
    <Tile {tile}>
      <TimerTile {tile} />
    </Tile>
  {/each}
  <CreateTile on:tileCreated />
</div>

<style>
  .row {
    display: flex;
  }
</style>
