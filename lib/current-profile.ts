import { auth, getAuth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
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

export const currentProfilePages = async (req: NextRequest) => {
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
