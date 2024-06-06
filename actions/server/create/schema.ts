import { Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const CreateServer = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image url is required.'
  })
})

export type InputType = z.infer<typeof CreateServer>
export type ReturnType = ActionState<InputType, Server>
