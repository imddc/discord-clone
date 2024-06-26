import { Hash } from 'lucide-react'
import ChatVideoButton from '~/components/chat/chat-video-button'
import MobileToggle from '~/components/mobile-toggle'
import { SocketIndicator } from '~/components/socket-indicator'
import { UserAvatar } from '~/components/user-avatar'

// import { SocketIndicator } from '~/components/socket-indicator'

interface ChatHeaderProps {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl
}: ChatHeaderProps) => {
  return (
    <div className="flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="mr-2 size-5 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === 'conversation' && (
        <UserAvatar src={imageUrl} className="mr-2 size-8 md:size-8" />
      )}
      <p className="font-semibold text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === 'conversation' && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  )
}
