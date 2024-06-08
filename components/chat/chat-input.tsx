'use client'

import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import { ElementRef, useRef, useState } from 'react'
import EmojiPicker from '~/components/emoji-picker'
import { Input } from '~/components/ui/input'
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
  const formRef = useRef<ElementRef<'form'>>(null)
  const [content, setContent] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleSelectEmoji = (emoji: string) => {
    setContent((v) => `${v} ${emoji}`)
  }

  const onSubmit = async (formData: FormData) => {
    const url = queryString.stringifyUrl({
      url: apiUrl,
      query
    })

    const values = {
      content: formData.get('content') as string
    }

    await axios.post(url, values)

    formRef.current?.reset()
    formRef.current?.focus()
  }

  const isLoading = false

  return (
    <form ref={formRef} action={onSubmit}>
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

        <Input
          name="content"
          disabled={isLoading}
          className="border-0 border-none bg-zinc-200/90 px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
          placeholder={`Message ${type === 'conversation' ? name : '#' + name}`}
          value={content}
          onChange={handleInputChange}
        />

        <div className="absolute right-8 top-7">
          <EmojiPicker onChange={handleSelectEmoji} />
        </div>
      </div>
    </form>
  )
}