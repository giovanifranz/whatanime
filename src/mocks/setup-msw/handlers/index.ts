import type { RequestHandler } from 'msw'

import { handlers as animeHandlers } from './anime'
import { handlers as internalHandlers } from './internal'
import { handlers as quoteCardHandlers } from './quote'

export const handlers: RequestHandler[] = [
  ...animeHandlers,
  ...quoteCardHandlers,
  ...internalHandlers,
]
