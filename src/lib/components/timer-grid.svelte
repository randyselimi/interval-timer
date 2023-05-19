<script lang="ts">
  import Timer from './timer.svelte';
  import CreateTimer from './create-timer.svelte';
  import type { TimerRow } from '../timer/timer-grid';
  export let rows: TimerRow[] = [];
</script>

{#each rows as row}
  <div class="row">
    {#each row.get() as timer}
      <div>
        <Timer {timer} />
      </div>
    {/each}
    <CreateTimer />
  </div>
{/each}
<CreateTimer />

<style>
  .row {
    display: flex;
  }
</style>
