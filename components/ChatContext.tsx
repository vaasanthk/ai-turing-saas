import { createContext, Dispatch, SetStateAction } from "react"
import { OpenAI } from "openai"

type ChatContextType = Dispatch<
  SetStateAction<OpenAI.Chat.ChatCompletionMessageParam[]>
> | null

export const ChatContext = createContext<ChatContextType>(null)
