import { Message } from '@prisma/client'
import { NextResponse } from 'next/server'
import { currentProfile } from '~/lib/current-profile'
import { db } from '~/lib/db'

const Message_BATCH = 20

export async function GET(req: Request) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)

    const cursor = searchParams.get('cursor')
    const channelId = searchParams.get('channelId')

    if (!profile) {
      return new NextResponse('Unauthorized!', { status: 401 })
    }

    if (!channelId) {
      return new NextResponse('Channel ID missing!', { status: 400 })
    }

    let messages: Message[] = []

    if (cursor) {
      messages = await db.message.findMany({
        take: Message_BATCH,
        skip: 1,
        cursor: {
          id: cursor
        },
        where: {
          channelId
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      messages = await db.message.findMany({
        take: Message_BATCH,
        where: {
          channelId
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    let nextCursor = null

    if (messages.length === Message_BATCH) {
      nextCursor = messages[Message_BATCH - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    })
  } catch (error) {
    return NextResponse.json({
      error: error
    })
  }
}
