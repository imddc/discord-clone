import { ChannelType, Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const CreateChannel = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.'
    })
    .refine((name) => name !== 'general', {
      message: "Channel name cannot be 'general'"
    }),
  type: z.nativeEnum(ChannelType),
  serverId: z.string()
})

export type InputType = z.infer<typeof CreateChannel>
export type ReturnType = ActionState<InputType, Server>
