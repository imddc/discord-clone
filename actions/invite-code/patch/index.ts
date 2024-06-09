'use server'

import { revalidatePath } from 'next/cache'
import { v4 as uuidV4 } from 'uuid'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { InputType, ReturnType, UpdateInviteCode } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { serverId } = data
  const profile = await currentProfile()

  if (!profile) {
    return {
      error: 'Profile not found'
    }
  }

  let server

  try {
    server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        inviteCode: uuidV4()
      }
    })
  } catch (err) {
    return {
      error: 'Failed to refresh inviteCode'
    }
  }

  revalidatePath(`/server/${serverId}`)
  return {
    data: server
  }
}

export const updateInviteCode = createSafeAction(UpdateInviteCode, handler)
