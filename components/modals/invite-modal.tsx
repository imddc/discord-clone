'use client'

import axios from 'axios'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'
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

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()

  const { server } = data
  const [copied, setCopied] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const initeUrl = `${origin}/invite/${server?.inviteCode}`
  const isModalOpen = isOpen && type === 'invite'

  const onCopy = () => {
    navigator.clipboard.writeText(initeUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      )
      onOpen('invite', { server: response.data })
    } catch (error) {
    } finally {
      setLoading(false)
    }
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
          <Label className="dark:text-secondary/70 text-xs font-bold uppercase text-zinc-500">
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

          <Button
            onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500"
          >
            Generate a new link
            <RefreshCw className="ml-2 size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
