import { runEval, createToolCallMessage } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { redditToolDefinition } from '../../src/tools/reddit'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'

const allTools = [
  redditToolDefinition,
  generateImageToolDefinition,
  dadJokeToolDefinition,
]

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: 'tell me something cool from reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'Whats happening on reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'can you generate an image of a sunset',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'take a photo of mars',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'get me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
