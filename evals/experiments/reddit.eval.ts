import { runEval, createToolCallMessage } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { redditToolDefinition } from '../../src/tools/reddit'

runEval('reddit', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [redditToolDefinition],
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
  ],
  scorers: [ToolCallMatch],
})
