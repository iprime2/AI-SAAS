'use client'

import { FC, useState } from 'react'
import axios from 'axios'

import { Zap } from 'lucide-react'
import { Button } from './ui/button'

interface SubscriptionBtnProps {
  isPro: boolean
}

const SubscriptionBtn: FC<SubscriptionBtnProps> = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      console.log('BILLING_ERROR', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={isPro ? 'default' : 'premium'}
      onClick={onClick}
      disabled={loading}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade to pro'}
      {isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}

export default SubscriptionBtn
