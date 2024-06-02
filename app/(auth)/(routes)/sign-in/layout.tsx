import React from 'react'

interface SignUpLayoutProps extends React.PropsWithChildren {
  children: React.ReactNode
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => {
  return <>{children}</>
}

export default SignUpLayout
