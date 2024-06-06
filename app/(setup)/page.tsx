import { redirect } from 'next/navigation'
import React from 'react'
import InitialModal from '~/components/modal/initial-modal'
import { db } from '~/lib/db'
import { initialProfile } from '~/lib/initial-profile'

const SetupPage = async () => {
  const profile = await initialProfile()
  // 这里已经被 initialProfile 内部处理了
  // 如果为undifined 则会跳转到sign-in 不会走到这里
  if (profile === undefined) {
    // 可以直接return null
    return null
  }

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}

export default SetupPage
