import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const UpdateInviteCode = z.object({
  serverId: z.string()
})

export type InputType = z.infer<typeof UpdateInviteCode>
export type ReturnType = ActionState<InputType, Server>
