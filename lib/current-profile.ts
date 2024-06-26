import { auth, getAuth } from '@clerk/nextjs/server'
import { NextApiRequest } from 'next'
import { db } from './db'

export const currentProfile = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  })

  return profile
}

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  })

  return profile
}
