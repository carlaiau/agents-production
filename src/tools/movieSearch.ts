import type { ToolFn } from '../../types'
import { z } from 'zod'
import { queryMovies } from '../rag/query'

export const movieSearchToolDefinition = {
  name: 'movieSearch',
  parameters: z.object({
    query: z
      .string()
      .describe('the search query used for vector search on movies'),
    genre: z.string().optional().describe('the genre of the movie'),
    director: z.string().optional().describe('the director of the movie'),
  }),
  description: 'Searches for movies and information about and their meta data',
}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearch: ToolFn<Args> = async ({ toolArgs }) => {
  let results
  try {
    const { query } = toolArgs
    results = await queryMovies(query)
  } catch (e) {
    console.error(e)
    return 'Error: Could not query the db to get movies'
  }

  const formattedResults = results.map((result) => {
    const { metadata, data } = result

    return { ...metadata, description: data }
  })

  return JSON.stringify(formattedResults, null, 2)
}
