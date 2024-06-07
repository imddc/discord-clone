'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updateServer } from '~/actions/server/edit'
import { FileUpload } from '~/components/file-upload'
import FormInput from '~/components/form/form-input'
import FormSubmit from '~/components/form/form-submit'
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

const EditServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const { execute, isLoading, fieldErrors } = useAction(updateServer, {
    onSuccess(data) {
      onClose()
      toast.success(`Server ${data.name} updated!`)
    },
    onError(error) {
      toast.error('Fail to update server!')
    }
  })

  const isModalOpen = isOpen && type === 'editServer'

  // 这里打开modal的时候是一定有server的
  const { server } = data

  const onSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const imageUrl = formData.get('imageUrl') as string

    execute({ name, imageUrl, serverId: server!.id })
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="space-y-8" suppressHydrationWarning>
          <div className="space-y-8 px-6">
            <div className="flex items-center justify-center text-center">
              <FileUpload value="/boji.jpeg" />
            </div>

            <FormInput
              disabled={false}
              placeholder="Enter server name"
              id="name"
              defaultValue={server?.name}
              errors={fieldErrors}
            />
          </div>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <FormSubmit variant="primary" disabled={false}>
              Save
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditServerModal
