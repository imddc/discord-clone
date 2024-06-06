'use server'

import { MemberRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { v4 as uuidV4 } from 'uuid'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { CreateServer, InputType, ReturnType } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, imageUrl } = data
  const profile = await currentProfile()

  if (!profile) {
    return {
      error: 'Profile not found'
    }
  }

  let server

  try {
    server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidV4(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        }
      }
    })
  } catch (err) {
    return {
      error: 'Failed to create server'
    }
  }

  revalidatePath(`/servers/${server.id}`)

  return {
    data: server
  }
}

export const createServer = createSafeAction(CreateServer, handler)
