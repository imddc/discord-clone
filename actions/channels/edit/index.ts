'use server'

import { MemberRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { InputType, ReturnType, UpdateChannel } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const profile = await currentProfile()

  if (!profile) {
    return {
      error: 'Unauthorized!'
    }
  }

  const { serverId, channelId, name, type } = data

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
          update: {
            where: {
              id: channelId,
              NOT: {
                name: 'general'
              }
            },
            data: {
              name,
              type
            }
          }
        }
      }
    })
  } catch (error) {
    return {
      error: 'Fail to update channel'
    }
  }

  revalidatePath(`/server/${serverId}`)
  return {
    data: server
  }
}

export const updateChannel = createSafeAction(UpdateChannel, handler)
