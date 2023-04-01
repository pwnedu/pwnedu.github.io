import { GamesSchema } from './types';

export default async function getAllItchProjects() {
    const response = await fetch(`https://itch.io/api/1/${import.meta.env.ITCH_API}/my-games`)
    const json = await response.json()

    const parsedResult = GamesSchema.safeParse(json)

    if (!parsedResult.success) {
        return []
    }


    const result = parsedResult.data.games.filter(game => game.published === true)

    return result
    let itchio = await fetch(
        `https://itch.io/api/1/${import.meta.env.ITCH_API}/my-games`
    ).then((res) => res.json());
    itchio = itchio["games"].filter((game) => game.published === true);

    return itchio
}