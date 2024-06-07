'use server'

import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { DeleteServer, InputType, ReturnType } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { serverId } = data
  const profile = await currentProfile()

  if (!profile) {
    return {
      error: 'Unauthorized'
    }
  }

  let server

  try {
    server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id
      }
    })
  } catch (err) {
    return {
      error: 'Failed to update server'
    }
  }

  revalidatePath(`/servers/${serverId}`)
  return {
    data: server
  }
}

export const deleteServer = createSafeAction(DeleteServer, handler)
