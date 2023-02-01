export default async function getAllGithubRepos() {
    const repos = []
    let result = await fetch("https://api.github.com/users/pwnedu/repos").then(
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