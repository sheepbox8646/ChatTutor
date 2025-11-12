import type { AllAction } from './action'
import type { PageType } from '@chat-tutor/shared'
import { v4 } from 'uuid'

export type UserMessage = {
  type: 'user'
  content: string
  images: string[]
}
export type AssistantMessage = {
  type: 'assistant'
  content: string
}
export type DrawMessage = {
  type: 'draw'
  page: string
  input?: string
  result?: string
}
export type SetMermaidMessage = {
  type: 'set-mermaid'
  page: string
}
export type NoteMessage = {
  type: 'note'
  page: string
}
export type PageMessage = {
  type: 'page'
  page: string
  pageType: PageType
}
export type Message = (UserMessage | AssistantMessage | DrawMessage | SetMermaidMessage | NoteMessage | PageMessage) & {
  id: string
  running?: boolean
}

export const createMessageResolver = (
  push: (message: Message) => void,
  get: () => Message[],
  uuid: () => string = v4,
) => {
  let divided: boolean = true
  return (action: AllAction) => {
    if (action.type === 'text') {
      if (divided) {
        push({
          type: 'assistant',
          content: '',
          id: uuid(),
          running: true,
        })
        divided = false
      }
      const messages = get()
        ; (<AssistantMessage>messages.at(-1)!).content += action.options.chunk
    } else {
      divided = true
      if (action.type === 'note') {
        push({
          type: 'note',
          page: action.page!,
          id: uuid(),
        })
      } else if (action.type === 'page') {
        push({
          type: 'page',
          page: action.options.id!,
          pageType: action.options.type as PageType,
          id: uuid(),
        })
      } else if (action.type === 'set-mermaid') {
        push({
          type: 'set-mermaid',
          page: action.page!,
          id: uuid(),
        })
      } else if (action.type === 'draw-start') {
        push({
          type: 'draw',
          page: action.options.page!,
          input: action.options.input!,
          id: uuid(),
          running: true,
        })
      } else if (action.type === 'draw-end') {
        const messages = get()
        ; (<Message>messages.at(-1)!).running = false
        ; (<DrawMessage>messages.at(-1)!).result = action.options.result!
      }
    }
  }
}
