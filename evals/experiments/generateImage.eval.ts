import { runEval, createToolCallMessage } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { generateImageToolDefinition } from '../../src/tools/generateImage'

runEval('generateImage', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: 'can you generate an image of a sunset',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'take a photo of mars',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
