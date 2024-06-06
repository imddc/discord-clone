'use client'

import React, { useEffect, useState } from 'react'
import { createServer } from '~/actions/server/create'
import { useAction } from '~/lib/use-action'
import { FileUpload } from '../file-upload'
import FormInput from '../form/form-input'
import FormSubmit from '../form/form-submit'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  const { execute, fieldErrors } = useAction(createServer, {
    onSuccess(data) {
      console.log(data)
    },
    onError(err) {
      console.log(err)
    }
  })

  if (!isMounted) {
    return null
  }

  const handleSubmit = (formData: FormData) => {
    const imageUrl = formData.get('imageUrl') as string
    const name = formData.get('name') as string

    execute({ imageUrl, name })
  }

  return (
    <Dialog open>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        {/* Modal title */}
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Giver your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        {/* Form  */}
        <form action={handleSubmit} className="space-y-8">
          {/* Image upload field */}
          <div className="space-y-8 px-6">
            <div className="flex-center text-center">
              <FileUpload value="/boji.jpeg" />
            </div>

            {/* Input field */}
            <FormInput
              label="Server Name"
              id="name"
              disabled={false}
              placeholder="Enter server name"
            />
          </div>

          {/* Submit button */}
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <FormSubmit disabled={false} variant="primary">
              Create
            </FormSubmit>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InitialModal
