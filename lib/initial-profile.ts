import { currentUser, redirectToSignIn } from '@clerk/nextjs/server'
import { Profile } from '@prisma/client'
import { db } from './db'

export const initialProfile = async (): Promise<Profile | undefined> => {
  const user = await currentUser()

  if (!user) {
    redirectToSignIn()
    return
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  })

  if (profile) {
    return profile
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.firstName + ' ' + user.lastName,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile
}
