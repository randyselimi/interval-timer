<script lang="ts">
  import type { Tile } from '$lib/tile/tile';
  import { onMount } from 'svelte';
  export let tile: Tile;
  let audio: HTMLAudioElement;
  tile.onFinish.push(finish);

  function finish() {
    audio.play();
  }

  onMount(() => {
    const tick = setInterval(() => {
      tile = tile;
    }, 10);

    return () => {
      tile.stop();
      clearInterval(tick);
    };
  });
</script>

<div>
  <h3>{tile.name}</h3>
  <p>Sound: {tile.sound}</p>
  <p>Type: {tile.type}</p>
  <p>x:{tile.x} y: {tile.y}</p>
  <slot />
  <audio src={tile.sound} bind:this={audio} />
</div>
