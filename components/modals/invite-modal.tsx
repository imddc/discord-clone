'use client'

import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { updateInviteCode } from '~/actions/invite-code/patch'
import FormSubmit from '~/components/form/form-submit'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useModal } from '~/hooks/use-modal-store'
import { useOrigin } from '~/hooks/use-origin'
import { useAction } from '~/lib/use-action'

const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()
  const { execute, isLoading, data: resData } = useAction(updateInviteCode, {})

  const { server } = data
  const [copied, setCopied] = useState(false)

  const initeUrl = `${origin}/invite/${server?.inviteCode}`
  const isModalOpen = isOpen && type === 'invite'

  const onCopy = () => {
    navigator.clipboard.writeText(initeUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onSubmit = async () => {
    execute({ serverId: server!.id })
    resData && onOpen('invite', { server: resData })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite friends
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Sever Invite Link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={initeUrl}
              readOnly
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>

          <form action={onSubmit}>
            <FormSubmit
              disabled={isLoading}
              variant="link"
              className="mt-4 text-xs text-zinc-500"
              size="sm"
            >
              Generate a new link
              <RefreshCw className="ml-2 size-4" />
            </FormSubmit>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
