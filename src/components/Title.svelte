<script lang="ts">
    export let title: string = "";
    export let as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";

    let cachedTitle = title;

    function effect(e) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval = null;
        let iteration = 0;
        interval = setInterval(() => {
            e.target.innerText = e.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return e.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= title.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svelte:element
    this={as}
    data-value={title}
    on:mouseover={effect}
    class={$$props.class}
>
    {cachedTitle}
</svelte:element>
