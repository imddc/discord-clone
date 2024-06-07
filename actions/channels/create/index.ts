'use server'

import { MemberRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { CreateChannel, InputType, ReturnType } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const profile = await currentProfile()

  if (!profile) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { serverId, name, type } = data

  if (!serverId) {
    return {
      error: 'Server ID missing!'
    }
  }

  if (name.toLocaleLowerCase() === 'generate') {
    return {
      error: 'Name cannot be general!'
    }
  }

  let server

  try {
    server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    })
  } catch (error) {
    return {
      error: 'Fail to create channel'
    }
  }

  revalidatePath(`/server/${serverId}`)
  return {
    data: server
  }
}

export const createChannel = createSafeAction(CreateChannel, handler)
