import {createAgent,tool,createMiddleware,ToolMessage, SystemMessage} from 'langchain'
import { ChatGroq } from '@langchain/groq'

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY!,
  model:"openai/gpt-oss-120b",
  temperature:0
})

const handleToolsErrors = createMiddleware({
  name:"HandleToolsErrors",
  wrapToolCall: async (request,handler)=> {
    try {
      return await handler(request)
    } catch (error) {
      return new ToolMessage({
        content: `Please check your input and try again. Error: ${error instanceof Error ? error.message : String(error)}`,
        tool_call_id: request.toolCall.id!
      })
    }
  }
})
const systemPrompt = new SystemMessage({
  content: [{
    type: "text",
    text: "You are a helpful assistant that can use tools to peform tasks according to the user's instructions. Always use the tools when necessary to provide accurate and efficient responses. If you encounter an error while using a tool, inform the user about the error and suggest checking their input."
  }]
})

export const createGroqAgent = (tools:any[] = []) => 
  createAgent({
    model,
    tools,
    middleware: [handleToolsErrors],
    systemPrompt
  })