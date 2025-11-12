import type { BaseElement } from './element'

type MaybeArray<T> = T | T[]
export type RootDocument = {
  refs?: Record<string, string>
  animations?: Record<string, Animation[] | Animation>
  root?: MaybeArray<BaseElement<string> | string>
}