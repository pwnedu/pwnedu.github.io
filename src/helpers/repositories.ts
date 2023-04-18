import { data } from "@data/repo-dummy";
import { RepositoriesSchema, Repositories } from "./types";
import fm from "front-matter";

const REPO_URL = "https://api.github.com/users/pwnedu/repos"


export default async function getAllGithubRepos(): Promise<Repositories> {
    if (import.meta.env.DEV) {
        return data
    }

    const response = await fetch(REPO_URL)
    const raw = await response.json()
    const parseResult = RepositoriesSchema.safeParse(raw)

    if (!parseResult.success) {
        return data;
    }


    const sortedResult = parseResult.data.sort((a, b) => b.pushed_at.getTime() - a.pushed_at.getTime()).filter(repo => repo.fork === false)

    let result = await Promise.all(sortedResult.map(async res => {
        res.watchers = await getWatchersCount(res.subscribers_url)
        res.img_url = await getThumbnailFromRepo(res.html_url)
        res.readme = await getReadme(res.html_url)
        return res
    }))

    result = result.filter(res => res.watchers > 0)

    return result;
}

export async function getWatchersCount(url: string): Promise<number> {
    const response = await fetch(url)
    const result = await response.json()
    return result.length > 0 ? result.length : 0
}

export async function getThumbnailFromRepo(url: string): Promise<string> {
    const imgURL =
        `${url}/blob/main/Documentation~/Images/thumbnail.png`
            .replace(
                "https://github.com/",
                "https://raw.githubusercontent.com/"
            )
            .replace("blob/", "");
    const result = await fetch(imgURL)

    if (!result.ok) {
        return ""
    }

    return imgURL
}

export async function getReadme(url: string): Promise<string> {
    const modifyUrl = `${url}/main/README.md`
    const cleanUrl = modifyUrl.replace('https://github.com/', 'https://raw.githubusercontent.com/')
    const response = await fetch(cleanUrl)
    const result = await response.text()

    const frontmatter = fm(result).attributes?.Description

    if (frontmatter !== "") {
        return frontmatter
    }

    return ""
}