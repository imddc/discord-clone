'use server'

import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { DeleteMember, InputType, ReturnTYpe } from './schema'

export const handler = async (data: InputType): Promise<ReturnTYpe> => {
  const profile = await currentProfile()
  const { serverId, memberId } = data

  if (!profile) {
    return {
      error: 'Unauthorized!'
    }
  }

  if (!serverId) {
    return {
      error: 'Server ID missed!'
    }
  }

  if (!memberId) {
    return {
      error: 'Member ID missed!'
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
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    })

    revalidatePath(`/server/${serverId}`)
    return {
      data: server
    }
  } catch (error) {
    console.log('[MESSAHE_ID_DELETE]', error)
    return {
      error: 'Internal Error'
    }
  }
}

export const deleteMember = createSafeAction(DeleteMember, handler)
