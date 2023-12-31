import Link from 'next/link'
import { ImArrowRight2 } from 'react-icons/im'

import { AnimeService } from '@/services/http'

import { animeStore } from '@/store/animeStore'

import { Button } from '../ui/button'

type Props = {
  title: string
}

export default async function QuoteButton({ title }: Props) {
  const { id, error, isLoading } = await AnimeService.getAnimesByTitle(title).then(
    (result) => {
      if (!result.data)
        return {
          id: null,
          isLoading: result.isLoading,
          error: result.error,
        }

      animeStore.setState({
        animeQuote: {
          data: result.data[0],
          isLoading: false,
          error: null,
        },
      })

      return {
        id: result.data[0].id,
        isLoading: result.isLoading,
        error: result.error,
      }
    },
  )

  if (isLoading || error || !id) return null

  return (
    <Button asChild className="absolute bottom-4 right-4">
      <Link href={`/anime/${id}`} prefetch={false}>
        <ImArrowRight2 size={20} />
      </Link>
    </Button>
  )
}
