import { z, defineCollection } from 'astro:content';

const snippetCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
    })
})

export const collections = {
    'snippets': snippetCollection
}