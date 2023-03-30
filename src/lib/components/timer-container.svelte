<script lang="ts">
	import { onMount } from 'svelte';
    import Timer from './timer.svelte'
    import {TimerController, type TimerData} from '../timer/timer-controller';
	import CreateTimer from './create-timer.svelte';

    let timerData : TimerData[] = 
    
    [{state: {duration: 1000, elapsed: 0, running: false, finished: false}, props: {name: "One Second", sound: "3718__noisecollector__909-clap.wav", x: 0, y: 0}},
    {state: {duration: 3000, elapsed: 0, running: false, finished: false}, props: {name: "Three Seconds", sound: "3719__noisecollector__909-hat-open.wav", x: 0, y: 1}},
    {state: {duration: 5000, elapsed: 0, running: false, finished: false}, props: {name: "Five Seconds", sound: "3723__noisecollector__909-kick-long.wav", x: 0, y: 2}},
    {state: {duration: 7500, elapsed: 0, running: false, finished: false}, props: {name: "Seven-Point-Five Seconds", sound: "3728__noisecollector__909-snare2.wav", x: 1, y: 0}},
    {state: {duration: 1000, elapsed: 0, running: false, finished: false}, props: {name: "One Second II", sound: "3725__noisecollector__909-kick2.wav", x: 1, y: 1}},
    {state: {duration: 1000, elapsed: 0, running: false, finished: false}, props: {name: "One Second III", sound: "3726__noisecollector__909-kick3.wav", x: 2, y: 1}},]
    let controller : TimerController = new TimerController(timerData);
    console.log(controller)
    $: rows = controller.grid.getRows();

    function start() {
        controller.start();
    }
    function stop() {
        controller.stop();
    }
    function reset() {
        controller.reset();
    }

    onMount(() => {
        const tick = setInterval(() => {
            controller = controller;
        }, 100)
        return () => {
            clearInterval(tick);
            controller.stop();
        }
    })
</script>

{#if !controller.running}
<button on:click={start}>
    Play
</button>
{:else}
<button on:click={stop}>
    Pause
</button>
{/if}
<button on:click={reset}>
    Reset
</button>
{#each rows as row}
    <div class="row">
        {#each row.get() as timer}
            <div>
                <Timer timer={timer}></Timer>
            </div>
        {/each}
        <CreateTimer></CreateTimer>
    </div>

{/each}
<CreateTimer></CreateTimer>


<style>
    .row {
  display: flex;
}

</style>

