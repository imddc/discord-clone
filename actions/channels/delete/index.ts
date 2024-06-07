'use server'

import { MemberRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { DeleteChannel, InputType, ReturnType } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const profile = await currentProfile()

  if (!profile) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { serverId, channelId } = data

  if (!serverId) {
    return {
      error: 'Server ID missing!'
    }
  }

  let server

  try {
    server = await db.server.update({
      where: {
        id: serverId,
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
          delete: {
            id: channelId,
            name: {
              not: 'general'
            }
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

export const deleteChannel = createSafeAction(DeleteChannel, handler)
