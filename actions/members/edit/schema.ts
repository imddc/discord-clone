import { MemberRole, Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const UpdateMember = z.object({
  serverId: z.string(),
  memberId: z.string(),
  role: z.nativeEnum(MemberRole)
})

export type InputType = z.infer<typeof UpdateMember>
export type ReturnTYpe = ActionState<InputType, Server>
