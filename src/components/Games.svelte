<script lang="ts">
    import { flip } from "svelte/animate";
    import GameCard from "@components/GameCard.svelte";
    import Title from "./Title.svelte";

    export let games = [];

    function shuffle() {
        games = games.sort(() => Math.random() - 0.5);
    }
</script>

<section class="space-y-4">
    <div class="flex justify-between">
        <Title
            class="inline-block px-4 font-mono text-2xl font-bold cursor-default hover:bg-accent hover:text-accent-invert"
            title="Game Projects"
            speed={20}
        />
        <button
            class="p-1 font-mono font-bold bg-accent text-accent-invert hover:text-accent hover:bg-accent-invert transition-colors duration-100 ease-linear"
            on:click={() => shuffle()}>Shuffle</button
        >
    </div>

    <ul class="grid grid-flow-row gap-4 sm:grid-cols-3">
        {#each games as game (game.id)}
            <li animate:flip={{ duration: 200 }}>
                <GameCard {game} />
            </li>
        {/each}
    </ul>
</section>
