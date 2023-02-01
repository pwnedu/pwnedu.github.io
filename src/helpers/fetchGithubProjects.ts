export default async function getAllGithubRepos() {
    const repos = []
    let result = await fetch("https://gist.githubusercontent.com/ashfidable/415e0609fe4ff751f2a95ba13d509846/raw/658d761276575d95c9a3535b1a7ac96c7eb6a07c/list-all-repo.json").then(
        (res) => res.json()
    );
    result = result.sort(
        (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )
        .filter((repo) => repo.fork === false)

    for (const c of result) {
        const api = await fetch(c.subscribers_url).then(res => res.json());
        console.log(c.name, api.length)
        if (api.length > 0) {
            c["watchers"] = api.length
            repos.push(c)
        }

    }


    return await repos;
}