import { ChannelType, Server } from '@prisma/client'
import { z } from 'zod'
import { ActionState } from '~/lib/create-safe-action'

export const UpdateChannel = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.'
    })
    .refine((name) => name !== 'general', {
      message: "Channel name cannot be 'general'"
    }),
  type: z.nativeEnum(ChannelType),
  serverId: z.string({
    message: 'Server ID missing!'
  }),
  channelId: z.string({
    message: 'Channel ID missing!'
  })
})

export type InputType = z.infer<typeof UpdateChannel>
export type ReturnType = ActionState<InputType, Server>
