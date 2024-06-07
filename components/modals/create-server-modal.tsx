'use client'

import { toast } from 'sonner'
import { createServer } from '~/actions/server/create'
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

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal()
  const { execute, isLoading } = useAction(createServer, {
    onSuccess(data) {
      console.log(data)
      toast.success(`Server ${data.name} created!`)
    },
    onError(err) {
      console.log(err)
      toast.success('Fail to create server')
    }
  })

  const isModalOpen = isOpen && type === 'createServer'

  const onSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string
    const imageUrl = formData.get('imageUrl') as string

    execute({
      name,
      imageUrl
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
              id="name"
              disabled={isLoading}
              placeholder="Enter server name"
            />
          </div>

          <DialogFooter className="bg-gray-100 px-6 py-4">
            <FormSubmit variant="primary" disabled={isLoading}>
              Crate
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateServerModal
