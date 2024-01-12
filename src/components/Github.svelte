<script lang="ts">
    import RepoCard from "@components/RepoCard.svelte";
    import Title from "@components/Title.svelte";
    import { flip } from "svelte/animate";
    import { onMount } from "svelte";
    import getAllGithubRepos from "@helpers/repositories";
    import type { Repositories } from "@helpers/types";

    export let repos: Repositories = [];
    export let interval = 300000;

    onMount(async () => {
        repos = await getAllGithubRepos();
        setInterval(async () => {
            repos = await getAllGithubRepos();
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
            class="p-1 font-mono font-bold bg-accent text-accent-invert hover:text-accent hover:bg-accent-invert transition-colors duration-100 ease-linear"
            on:click={shuffle}>Shuffle</button
        >
    </div>
    <ul class="grid grid-flow-row gap-4 md:grid-cols-2">
        {#each repos as repo (repo.name)}
            <div animate:flip={{ duration: 200 }}>
                <RepoCard {repo} />
            </div>
        {/each}
    </ul>
</section>
