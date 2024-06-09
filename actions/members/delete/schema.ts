import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const DeleteMember = z.object({
  serverId: z.string(),
  memberId: z.string()
})

export type InputType = z.infer<typeof DeleteMember>
export type ReturnTYpe = ActionState<InputType, Server>
