import { NextResponse } from 'next/server'
import { v4 as uuidV4 } from 'uuid'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'

export const PATCH = async (
  req: Request,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 500 })
    }

    if (!params.serverId) {
      return new NextResponse('Server ID missing', { status: 401 })
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        inviteCode: uuidV4()
      }
    })

    return NextResponse.json(server)
  } catch (err) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
