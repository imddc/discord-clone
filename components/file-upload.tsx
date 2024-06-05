'use client'

// TODO: upload server image
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface FileUploadInterface {
  onChange: (url?: string) => void
  value: string
  endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
}: FileUploadInterface) => {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="relative size-20">
        <Image src={value} alt="upload" className="rounded-full" fill />
        {/* <button */}
        {/*   onClick={() => onChange('')} */}
        {/*   className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm" */}
        {/*   type="button" */}
        {/* > */}
        {/*   <X className="size-4" /> */}
        {/* </button> */}
      </div>
    )
  }

  // If uploaded file is pdf.
  if (value && fileType === 'pdf') {
    return (
      <div className="bg-background/10 relative mt-2 flex items-center rounded-md p-2">
        <FileIcon className="size-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
        >
          {value}
        </a>

        <button
          onClick={() => onChange('')}
          className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <Avatar className="size-16">
      <AvatarImage src="/boji.jpeg" alt="avatar" />
      <AvatarFallback>avatar</AvatarFallback>
    </Avatar>
  )
}
