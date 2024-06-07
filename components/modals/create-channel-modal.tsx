'use client'

import { ChannelType } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createChannel } from '~/actions/channels/create'
import FormInput from '~/components/form/form-input'
import FormSelect from '~/components/form/form-select'
import FormSubmit from '~/components/form/form-submit'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import { useModal } from '~/hooks/use-modal-store'
import { useAction } from '~/lib/use-action'

const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()
  const params = useParams()

  const { execute, isLoading, fieldErrors } = useAction(createChannel, {
    onSuccess(data) {
      toast.success(`Created channel!`)
      onClose()
    },
    onError(error) {
      toast.error(error)
    }
  })

  const isModalOpen = isOpen && type === 'createChannel'
  const { channelType } = data

  const onSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const type = formData.get('type') as ChannelType
    const serverId = params.serverId as string

    execute({
      name,
      type,
      serverId
    })
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <form action={onSubmit} className="space-y-8">
          <div className="space-y-8 px-6">
            <FormInput
              id="name"
              disabled={isLoading}
              label="Channel name"
              placeholder="Enter channel name"
              errors={fieldErrors}
            />
            <FormSelect
              id="type"
              label="Channel Type"
              disabled={isLoading}
              errors={fieldErrors}
            />
          </div>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <FormSubmit variant="primary" disabled={isLoading}>
              Create
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannelModal
