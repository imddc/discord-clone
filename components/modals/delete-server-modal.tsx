'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteServer } from '~/actions/server/delete'
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

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const { execute, isLoading } = useAction(deleteServer, {
    onSuccess(data) {
      toast.success('Deleted server!')
      onClose()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const isModalOpen = isOpen && type === 'deleteServer'
  const { server } = data

  const onConfirm = async () => {
    const serverId = server!.id
    execute({ serverId })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Server
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-zinc-500">
          Are you sure you want to do this? <br />
          <span className="font-semibold text-indigo-500">
            {server?.name}
          </span>{' '}
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

export default DeleteServerModal
