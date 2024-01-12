import { z } from 'zod';

const RepositoriesSchema = z.object({
    name: z.string(),
    description: z.string(),
    stargazers_count: z.number(),
    watchers_count: z.number(),
    pushed_at: z.coerce.date(),
    html_url: z.string(),
    img_url: z.string().optional(),
    subscribers_url: z.string(),
    language: z.string().nullable().optional(),
    watchers: z.number().optional(),
    fork: z.boolean(),
    readme: z.string().optional()
}).array()

const RepositorySchema = RepositoriesSchema.element

const GamesSchema = z.object({
    games: z.object({
        cover_url: z.string(),
        title: z.string(),
        published: z.boolean(),
        url: z.string()
    }).array()
})


export type Repositories = z.infer<typeof RepositoriesSchema>
export type Repository = z.infer<typeof RepositorySchema>
export type Games = z.infer<typeof GamesSchema>
export { RepositoriesSchema, GamesSchema, RepositorySchema }