<script lang="ts">
    import { onMount } from "svelte";

    const themes = ["dark", "light", "blue"];

    let html: HTMLElement;
    let avatar: HTMLImageElement;

    const lightAvatar = "/images/avatar_light.png";
    const darkAvatar = "/images/avatar.png";

    function changeTheme(newTheme: string) {
        html.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
        if (newTheme === "light") {
            avatar.src = lightAvatar;
        } else {
            avatar.src = darkAvatar;
        }
    }

    onMount(() => {
        html = document.documentElement;
        avatar = document.querySelector(".avatar");

        if (
            typeof localStorage !== "undefined" &&
            localStorage.getItem("theme")
        ) {
            if (localStorage.getItem("item") === "light") {
                avatar.src = lightAvatar;
            }
        } else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                avatar.src = darkAvatar;
            } else {
                avatar.src = lightAvatar;
            }
        }
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
