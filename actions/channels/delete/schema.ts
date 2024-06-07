import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const DeleteChannel = z.object({
  serverId: z.string(),
  channelId: z.string()
})

export type InputType = z.infer<typeof DeleteChannel>
export type ReturnType = ActionState<InputType, Server>
