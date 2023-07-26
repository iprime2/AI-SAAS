import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
// import Replicate from 'replicate'

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_KEY!,
// })

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Message not provided', { status: 400 })
    }

    const freeTrail = await checkApiLimit()

    if (!freeTrail) {
      return new NextResponse('Free trail limit expired', { status: 403 })
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    })

    // const response = await replicate.run(
    //   'a16z-infra/llama13b-v2-chat:6b4da803a2382c08868c5af10a523892f38e2de1aafb2ee55b020d9efef2fdb8',
    //   {
    //     input: {
    //       prompt: '...',
    //     },
    //   }
    // )

    await increaseApiLimit()

    return NextResponse.json(response.data.choices[0].message)
    // return NextResponse.json(response.data.choices[0].message)
  } catch (error) {
    console.log('[CONVERSATION_ERROR', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
