import { rest, type SetupWorker } from 'msw'

declare global {
  interface Window {
    msw: {
      worker: SetupWorker
      rest: typeof rest
    }
  }
}

async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    const { worker } = await import('./browser')

    window.msw = {
      worker,
      rest,
    }

    worker.start({ onUnhandledRequest: 'bypass' })
  }
}

initMocks()

export {}
