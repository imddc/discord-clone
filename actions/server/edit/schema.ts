import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const UpdateServer = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image url is required.'
  }),
  serverId: z.string({
    message: 'Server is required'
  })
})

export type InputType = z.infer<typeof UpdateServer>
export type ReturnType = ActionState<InputType, Server>
