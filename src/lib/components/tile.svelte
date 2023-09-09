<script lang="ts">
  import type { Tile } from '$lib/tile/tile';
  import { onMount } from 'svelte';
  export let tile: Tile;
  let audio: HTMLAudioElement;
  tile.onFinish.push(finish);

  function finish() {
    if (tile.sound === 'tts') {
      var msg = new SpeechSynthesisUtterance(tile.name);
      window.speechSynthesis.speak(msg);
    } else {
      audio.play();
    }
  }

  onMount(() => {
    const tick = setInterval(() => {
      tile = tile;
    }, 100);

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
