'use client'

import { MemberRole } from '@prisma/client'
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteMember } from '~/actions/members/delete'
import { updateMember } from '~/actions/members/edit'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { ScrollArea } from '~/components/ui/scroll-area'
import { UserAvatar } from '~/components/user-avatar'
import { useModal } from '~/hooks/use-modal-store'
import { useAction } from '~/lib/use-action'
import { ServerWithMembersWithProfiles } from '~/types'

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 size-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="size-4 text-rose-500" />
}

const MembersModal = () => {
  const router = useRouter()
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const [loadingId, setLoadingId] = useState('')

  const {
    execute: deleteMemberExecute,
    isLoading: deleteMemberLoading,
    data: deleteMemberData
  } = useAction(deleteMember, {
    onSuccess(_data) {
      toast.success('deleted success!')

      onOpen('members', {
        server: _data as ServerWithMembersWithProfiles
      })
    },
    onError(error) {
      toast.error(error)
    }
  })

  const {
    execute: updateMemberExecute,
    isLoading: updateMemberLoading,
    data: updateMemberData
  } = useAction(updateMember, {
    onSuccess(_data) {
      toast.success('updated member role!')

      onOpen('members', {
        server: _data as ServerWithMembersWithProfiles
      })
    },
    onError(error) {
      toast.error(error)
    }
  })

  const { server } = data as { server: ServerWithMembersWithProfiles }

  const isModalOpen = isOpen && type === 'members'

  const onKick = async (memberId: string) => {
    const values = {
      memberId,
      serverId: server.id
    }
    deleteMemberExecute(values)
  }

  const onRoleChange = (memberId: string, role: MemberRole) => {
    const values = {
      memberId,
      serverId: server.id,
      role: role
    }

    updateMemberExecute(values)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="mb-6 flex items-center gap-x-2">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-1 text-xs font-semibold">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-zinc-500">{member.profile.email}</p>
              </div>

              {/* actions */}
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="size-4 text-zinc-500" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="mr-2 size-4" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, 'GUEST')}
                              >
                                <Shield className="mr-2 size-4" />
                                Guest
                                {member.role == 'GUEST' && (
                                  <Check className="ml-auto size-4" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, 'MODERATOR')
                                }
                              >
                                <ShieldCheck className="mr-2 size-4" />
                                Moderator
                                {member.role == 'MODERATOR' && (
                                  <Check className="ml-auto size-4" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className="mr-2 size-4" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto size-4 animate-spin text-zinc-500" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default MembersModal
