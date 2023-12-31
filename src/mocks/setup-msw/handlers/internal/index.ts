import { getAnimesByTitleMock } from '@/mocks'
import { type RequestHandler, rest } from 'msw'

export const handlers: RequestHandler[] = [
  rest.get<typeof getAnimesByTitleMock>(`/api/anime`, (req, res, ctx) => {
    if (req.url.searchParams.get('title')) {
      return res(ctx.delay(100), ctx.status(200), ctx.json(getAnimesByTitleMock))
    }
  }),
]
