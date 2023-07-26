'use client'

import { FC, useEffect, useState } from 'react'

import { ZapIcon } from 'lucide-react'

import { MAX_FREE_COUNTS } from '@/constants'

import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { Button } from './ui/button'

interface FreeCounterProps {
  apiLimitCount: number
}

const FreeCounter: FC<FreeCounterProps> = ({ apiLimitCount = 0 }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='px-3'>
      <Card className='bg-white/10 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm space-y-2 text-white mb-4'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
            <Button variant='premium' className='w-full'>
              Upgrade
              <ZapIcon className='w-4 h-4 ml-2 fill-white' />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter
