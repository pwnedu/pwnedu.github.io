<script>
    import Card from "@components/Card.svelte";
    import Title from "@components/Title.svelte";
    import { flip } from "svelte/animate";
    import { onMount } from "svelte";

    export let repos = [];
    export let interval = 120000;

    onMount(async () => {
        if (import.meta.env.PROD) {
            setInterval(async () => {
                repos = await fetch(
                    "https://api.github.com/users/pwnedu/repos"
                ).then((res) => res.json());
            }, interval);
        }
    });

    function shuffle() {
        repos = repos.sort((a, b) => 0.5 - Math.random());
        console.log("shuffled");
    }
</script>

<section class="space-y-4">
    <div class="flex justify-between">
        <Title
            class="inline-block px-4 font-mono text-2xl font-bold cursor-default hover:bg-accent hover:text-accent-invert"
            title="GitHub Projects"
            speed={20}
        />
        <button
            class="p-1 font-mono font-bold bg-accent text-accent-invert"
            on:click={shuffle}>Shuffle</button
        >
    </div>
    <ul class="grid grid-flow-row gap-4 md:grid-cols-2">
        {#each repos as repo (repo.id)}
            <div animate:flip={{ duration: 200 }}>
                <Card {repo} />
            </div>
        {/each}
    </ul>
</section>
