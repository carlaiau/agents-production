import { runEval, createToolCallMessage } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'

runEval('dadJoke', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    {
      input: 'get me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
