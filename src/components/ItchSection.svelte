<script>
    import { flip } from "svelte/animate";
    import GameCard from "./GameCard.svelte";
    import Title from "./Title.svelte";

    export let games = [];

    function shuffle() {
        games = games.sort(() => Math.random() - 0.5);
    }
</script>

<section class="space-y-4">
    <Title
        class="inline-block px-4 font-mono text-2xl font-bold cursor-default hover:bg-white hover:text-black"
        title="Game Projects"
        speed={20}
    />
    <ul class="grid grid-flow-row gap-4 sm:grid-cols-2">
        {#each games as game (game.title)}
            <li animate:flip={{ duration: 200 }}>
                <GameCard {game} />
            </li>
        {/each}
    </ul>
</section>
