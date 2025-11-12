import type { RootDocument } from '@dsl/renderer-core'

export type Template = {
  id: string
  content?: RootDocument | string
  templates?: Template[]
}

export default [
  
] as Template[]