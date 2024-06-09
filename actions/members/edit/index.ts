'use server'

import { revalidatePath } from 'next/cache'
import { createSafeAction } from '~/lib/create-safe-action'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'
import { InputType, ReturnTYpe, UpdateMember } from './schema'

export const handler = async (data: InputType): Promise<ReturnTYpe> => {
  const profile = await currentProfile()
  const { serverId, memberId, role } = data

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
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id
              }
            },
            data: {
              role
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

export const updateMember = createSafeAction(UpdateMember, handler)
