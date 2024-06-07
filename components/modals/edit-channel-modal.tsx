'use client'

import { ChannelType } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateChannel } from '~/actions/channels/edit'
import FormInput from '~/components/form/form-input'
import FormSelect from '~/components/form/form-select'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import { useModal } from '~/hooks/use-modal-store'
import { useAction } from '~/lib/use-action'

const EditChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const { execute, isLoading } = useAction(updateChannel, {
    onSuccess(data) {
      toast.success(`Updated channel!`)
      onClose()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const isModalOpen = isOpen && type === 'editChannel'
  const { channel, server } = data

  const onSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const type = formData.get('type') as ChannelType
    const serverId = server!.id
    const channelId = channel!.id

    execute({ name, type, serverId, channelId })
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <form action={onSubmit} className="space-y-8">
          <div className="space-y-8 px-6">
            <FormInput
              id="name"
              disabled={isLoading}
              label="Channel Name"
              placeholder="Enter channel name"
              defaultValue={channel?.name}
            />

            <FormSelect
              id="type"
              disabled={isLoading}
              label="Channel Type"
              defaultValue={channel?.type}
            />
          </div>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <Button variant="primary" disabled={isLoading}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditChannelModal
