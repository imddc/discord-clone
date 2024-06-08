'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import EmojiPicker from '~/components/emoji-picker'
import FormInput from '~/components/form/form-input'
import { useModal } from '~/hooks/use-modal-store'

interface ChatInputProps {
  apiUrl: string
  query: Record<string, any>
  name: string
  type: 'conversation' | 'channel'
}

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal()
  const router = useRouter()

  const handleSelectEmoji = (emoji: string) => {
    console.log(emoji, '--> select emoji')
  }

  const onSubmit = async (formData: FormData) => {
    const content = formData.get('content') as string

    console.log(content)
  }

  const isLoading = false

  return (
    <form action={onSubmit}>
      <div className="relative p-4 pb-6">
        <button
          type="button"
          // onClick={() => onOpen('messageFile', { apiUrl, query })}
          onClick={() => {
            console.log('--> opem messageFile')
          }}
          className="absolute left-8 top-7 flex size-[24px] items-center justify-center rounded-full bg-zinc-500 p-1 transition hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300"
        >
          <Plus className="text-white dark:text-[#313338]" />
        </button>

        <FormInput
          id="content"
          disabled={isLoading}
          className="border-0 border-none bg-zinc-200/90 px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
          placeholder={`Message ${type === 'conversation' ? name : '#' + name}`}
        />

        <div className="absolute right-8 top-7">
          <EmojiPicker onChange={handleSelectEmoji} />
        </div>
      </div>
    </form>
  )
}
