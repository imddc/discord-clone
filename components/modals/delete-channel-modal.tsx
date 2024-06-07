'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteChannel } from '~/actions/channels/delete'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import { useModal } from '~/hooks/use-modal-store'
import { useAction } from '~/lib/use-action'

const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const { execute, isLoading } = useAction(deleteChannel, {
    onSuccess(data) {
      toast.success('Deleted channel!')
      onClose()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const isModalOpen = isOpen && type === 'deleteChannel'
  const { server, channel } = data

  const onConfirm = async () => {
    const channelId = channel!.id
    const serverId = server!.id

    execute({ channelId, serverId })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Channel
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-zinc-500">
          Are you sure you want to do this? <br />
          <span className="font-semibold text-indigo-500">
            #{channel?.name}
          </span>
          will be permanently deleted.
        </DialogDescription>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onConfirm} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteChannelModal
