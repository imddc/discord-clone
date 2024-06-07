import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const LeaveServer = z.object({
  serverId: z.string()
})

export type InputType = z.infer<typeof LeaveServer>
export type ReturnType = ActionState<InputType, Server>
