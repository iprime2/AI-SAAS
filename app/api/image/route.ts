import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { checkSubscription } from '@/lib/subscription'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt, amount, resolution = '512x512' } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 })
    }

    if (!prompt) {
      return new NextResponse('prompt not provided', { status: 400 })
    }

    if (!amount) {
      return new NextResponse('amount not provided', { status: 400 })
    }
    if (!resolution) {
      return new NextResponse('resolution not provided', { status: 400 })
    }

    const freeTrail = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrail && !isPro) {
      return new NextResponse('Free trail limit expired', { status: 403 })
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount),
      size: resolution,
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.data.data)
  } catch (error) {
    console.log('[IMAGE_ERROR', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
