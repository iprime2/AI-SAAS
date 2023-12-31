import { auth } from '@clerk/nextjs'
import prismadb from './prismadb'
import { MAX_FREE_COUNTS } from '@/constants'

export const increaseApiLimit = async () => {
  const { userId } = auth()

  if (!userId) return

  const apiUserLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (apiUserLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId,
      },
      data: { count: apiUserLimit.count + 1 },
    })
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId: userId,
        count: 1,
      },
    })
  }
}

export const checkApiLimit = async () => {
  const { userId } = auth()

  if (!userId) return false

  const apiUserLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  })

  if (!apiUserLimit || apiUserLimit.count < MAX_FREE_COUNTS) {
    return true
  } else {
    return false
  }
}

export const getApiLimitCount = async () => {
  const { userId } = auth()

  if (!userId) return 0

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  })

  if (!userApiLimit) return 0

  return userApiLimit.count
}
