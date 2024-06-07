import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const DeleteServer = z.object({
  serverId: z.string()
})

export type InputType = z.infer<typeof DeleteServer>
export type ReturnType = ActionState<InputType, Server>
