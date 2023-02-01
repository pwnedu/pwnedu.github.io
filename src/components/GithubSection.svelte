<script lang="ts">
    import Card from "@components/Card.svelte";
    import Title from "@components/Title.svelte";
    import { flip } from "svelte/animate";
    import { onMount } from "svelte";
    import getAllGithubRepos from "@helpers/fetchGithubProjects";
    import { repoDummy } from "@data/repoDummy";

    export let repos = [];
    export let interval = 300000;

    onMount(async () => {
        repos = import.meta.env.PROD ? await getAllGithubRepos() : repoDummy;
        setInterval(async () => {
            repos = import.meta.env.PROD
                ? await getAllGithubRepos()
                : repoDummy;
            console.log("fetched new data");
        }, interval);
    });

    function shuffle() {
        repos = repos.sort((a, b) => 0.5 - Math.random());
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
        {#each repos as repo (repo.name)}
            <div animate:flip={{ duration: 200 }}>
                <Card {repo} />
            </div>
        {/each}
    </ul>
</section>
