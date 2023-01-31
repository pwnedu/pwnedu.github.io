<script lang="ts">
    import { onMount } from "svelte";

    const themes = ["dark", "light", "blue"];

    let html: HTMLElement;

    function changeTheme(newTheme: string) {
        html.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
    }

    onMount(() => {
        html = document.documentElement;
    });
</script>

<div class="flex items-center gap-2">
    {#each themes as theme}
        <button
            data-theme={theme}
            class="w-6 h-6 transition-all duration-150 ease-linear rounded-full bg-main shadow-solid-1 hover:shadow-solid-2 hover:shadow-secondary shadow-secondary"
            on:click={() => changeTheme(theme)}
        />
    {/each}
</div>
