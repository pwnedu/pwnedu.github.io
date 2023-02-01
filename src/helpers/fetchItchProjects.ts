export default async function getAllItchProjects() {
    let itchio = await fetch(
        `https://itch.io/api/1/${import.meta.env.ITCH_API}/my-games`
    ).then((res) => res.json());
    itchio = itchio["games"].filter((game) => game.published === true);

    return itchio
}